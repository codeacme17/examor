import os
import asyncio

from typing import Awaitable
from langchain import LLMChain
from langchain.schema import Document
from langchain.callbacks import AsyncIteratorCallbackHandler

import db_services as _dbs_

from .langchain_llm import LLM
from prompts import choose_prompt


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
        """
        Initializes a Chain instance.

        :param note_id: The ID of the note.
        :param file_id: The ID of the file.
        :param filename: The filename.
        :param prompt_language: The language for prompts.
        :param prompt_type: The type of prompt.
        :param temperature: The temperature for language model.
        :param streaming: Whether streaming is enabled.
        """
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

    async def agenerate_questions(
        self,
        docs: list[Document],
        title: str,
        question_type: str
    ):
        """
        Generates questions for documents.

        :param docs: List of Document objects.
        :param title: The title of the questions.
        """
        tasks = []
        timeout = _adjust_timeout_by_payment_status()
        llm_chain = self._init_llm_chain(timeout, "", question_type)
        for doc in docs:
            doc_id = _dbs_.document.save_doc_to_db(
                self.note_id, self.file_id, self.filename, doc.page_content)
            tasks.append(self._agenerate_questions(
                llm_chain, doc, title, doc_id, question_type))

        try:
            await asyncio.wait_for(asyncio.gather(*tasks), timeout=len(docs) * timeout)
        except Exception as e:
            _dbs_.file.delete_file(self.file_id)
            raise e

    async def _agenerate_questions(
        self,
        llm_chain: LLMChain,
        doc: Document,
        title: str,
        doc_id: int,
        question_type: str
    ):
        """
        Generates questions for a document using the language model.

        :param llm_chain: The LLMChain instance.
        :param doc: The Document object.
        :param title: The title for questions.
        :param doc_id: The ID of the document.
        """
        async with self.semaphore:
            res = await llm_chain.apredict(
                title=title,
                context=doc.page_content
            )
            question = self._spite_questions(res, question_type)
            for question_content in question:
                _dbs_.question.save_question_to_db(
                    question_content,
                    doc_id,
                    question_type
                )

    def _spite_questions(
        self,
        content: str,
        question_type: str
    ):
        questions = []
        if (question_type == "choice"):
            questions = content.strip().split('\n\n')
        else:
            questions = content.strip().split("\n")
        return questions

    async def aexamine_answer(
        self,
        id: int,
        context: str,
        question: str,
        answer: str,
        role: str,
        question_type: str,
    ):
        """
        Examines an answer using the language model.

        :param id: The ID of the question.
        :param context: The context for examination.
        :param question: The question for examination.
        :param answer: The answer for examination.
        :param role: The role for the examination.
        :yield: The examination results.
        """
        llm_chain = self._init_llm_chain(60, role, question_type)
        coroutine = wait_done(llm_chain.apredict(
            context=context,
            question=question,
            answer=answer,
            callbacks=self.llm_callbacks
        ), self.llm_callbacks[0].done)

        task = asyncio.create_task(coroutine)
        exmine = ""
        async for token in self.llm_callbacks[0].aiter():
            exmine += token
            yield f"{token}"

        try:
            await task
        except Exception as e:
            yield str(e)
            return

        await _dbs_.question.update_question_state(id, f"{answer} ||| {exmine}")

    def _init_llm_chain(self, timeout: int, role: str, question_type: str):
        """
        Initializes the language model chain.

        :param timeout: The timeout value.
        :param role: The role for the examination.
        :return: The initialized LLMChain instance.
        """
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


async def wait_done(
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


def _adjust_timeout_by_payment_status():
    payment = os.environ.get("PAYMENT", "free")
    if (payment == "free"):
        return 60
    else:
        return 20


def _adjust_concurrency_by_payment_status():
    payment = os.environ.get("PAYMENT", "free")
    if (payment == "free"):
        return 1
    else:
        return 5


def _adjust_retries_by_payment_status():
    payment = os.environ.get("PAYMENT", "free")
    if (payment == "free"):
        return 20
    else:
        return 3
