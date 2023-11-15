import os
import re
import asyncio
import datetime
from typing import Awaitable
from langchain import LLMChain
from langchain.schema import Document
from langchain.callbacks import AsyncIteratorCallbackHandler

import db_services as _dbs_
from .langchain_llm import LLM
from utils.ebbinghaus import handle_ebbinghaus_memory
from prompts import choose_prompt


# Main Chain class, which encapsulates LLMChain configurations and various methods.
class Chain:
    def __init__(
        self,
        note_id: int = 0,
        file_id: int = 0,
        filename: str = "",
        prompt_language: str = "",
        prompt_type: str = "",
        temperature: int = 0,
        streaming: bool = False
    ):
        self.semaphore = asyncio.Semaphore(
            _adjust_concurrency_by_payment_status())
        self.note_id = note_id
        self.file_id = file_id
        self.filename = filename
        self.prompt_language = prompt_language
        self.prompt_type = prompt_type
        self.temperature = temperature
        self.streaming = streaming
        self.llm_callbacks = [AsyncIteratorCallbackHandler()]
        self.question_count = 0

    # Asynchronous method to generate questions.
    async def agenerate_questions(
        self,
        docs: list[Document],
        title: str,
        question_type: str
    ):
        tasks = []
        llm_chain = self._init_llm_chain(
            timeout=60, question_type=question_type)
        for doc in docs:
            doc_id = _dbs_.document.save_doc_to_db(
                self.note_id, self.file_id, self.filename, doc.page_content)
            tasks.append(self._agenerate_questions(
                llm_chain, doc, title, doc_id, question_type))

        try:
            await asyncio.wait_for(asyncio.gather(*tasks), timeout=len(docs) * 60)
        except Exception as e:
            _dbs_.file.set_file_is_uploading_state(
                self.file_id, self.question_count)
            raise e
        return self.question_count

    # Helper method for specific question generation.
    async def _agenerate_questions(
        self,
        llm_chain: LLMChain,
        doc: Document,
        title: str,
        doc_id: int,
        question_type: str
    ):
        async with self.semaphore:
            res = await llm_chain.apredict(
                title=title,
                context=doc.page_content
            )
            for question in _spite_questions(res, question_type):
                if not _is_legal_question_structure(question, question_type):
                    continue
                _dbs_.question.save_question_to_db(
                    question_content=_remove_prefix_numbers(question),
                    document_id=doc_id,
                    question_type=question_type,
                    designated_role=os.environ.get("CURRENT_ROLE")
                )
                self.question_count += 1

    # Method to check answers.
    async def aexamine_answer(
        self,
        quesiton_id: int,
        context: str,
        question: str,
        answer: str,
        role: str,
        question_type: str,
    ):
        llm_chain = self._init_llm_chain(60, role, question_type)
        coroutine = _wait_done(llm_chain.apredict(
            context=context,
            question=question,
            answer=answer,
            callbacks=self.llm_callbacks
        ), self.llm_callbacks[0].done)

        task = asyncio.create_task(coroutine)
        examine = ""
        async for token in self.llm_callbacks[0].aiter():
            examine += token
            yield f"{token}"

        try:
            await task
        except Exception as e:
            yield str(e)
            return

        score = _extract_score(examine)
        push_date = _get_push_date(score)
        await _dbs_.question.update_question_state(
            id=quesiton_id,
            answer=f"{answer} ||| {examine}",
            score=score,
            push_date=push_date
        )

    def _init_llm_chain(self, timeout: int = 10, role: str = "", question_type: str = ""):
        llm_instance = LLM(
            temperature=self.temperature,
            streaming=self.streaming,
            callbacks=self.llm_callbacks,
            max_retries=_adjust_retries_by_payment_status(),
            timeout=timeout
        )

        prompt = choose_prompt(
            role,
            question_type,
            self.prompt_language,
            self.prompt_type
        )

        return LLMChain(
            prompt=prompt,
            llm=llm_instance.llm,
        )


# Helper function to wait for asynchronous tasks to complete.
async def _wait_done(
    fn: Awaitable,
    event: asyncio.Event
):
    try:
        await fn
    except Exception as e:
        event.set()
        raise e
    finally:
        event.set()


# Adjust concurrency based on payment status.
def _adjust_concurrency_by_payment_status():
    payment = os.environ.get("PAYMENT", "free")
    if (payment == "free"):
        return 1
    else:
        return 3


# Adjust the number of retries based on payment status.
def _adjust_retries_by_payment_status():
    payment = os.environ.get("PAYMENT", "free")
    if (payment == "free"):
        return 20
    else:
        return 6


# Split the generated questions.
def _spite_questions(
    content: str,
    type: str
):
    questions = []
    if (type == "choice"):
        questions = content.strip().split('\n\n')
    else:
        questions = content.strip().split("\n")
    return questions


# Check if the structure of the question is valid.
def _is_legal_question_structure(
    content: str,
    type: str
):
    if content == "":
        return False

    if len(content) < 12:
        return False

    if type == "choice":
        pattern = r'^-\s.+?\n\s*A\..+\n\s*B\..+\n\s*C\..+\n\s*D\..+$'
        return bool(re.match(pattern, content))

    if type == "blank":
        return "_____" in content

    return True


# Remove prefix numbers or dashes from a question.
def _remove_prefix_numbers(text):
    cleaned_text = re.sub(r'^\s*(?:\d+\.|-)\s*', '', text)
    return cleaned_text.strip()


# Extract score from the answer.
def _extract_score(anwser: str):
    score = re.findall(r"\d+\.?\d*", anwser)
    if score:
        return int(float(score[0]))
    else:
        return 0


# Get the push date based on the score.
def _get_push_date(score: int):
    now = datetime.datetime.now()
    days = handle_ebbinghaus_memory(score)
    return ((now+datetime.timedelta(days)).strftime("%Y-%m-%d"))
