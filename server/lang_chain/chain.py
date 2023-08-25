import asyncio
from typing import Awaitable
from langchain import LLMChain
from langchain.schema import Document, HumanMessage
from langchain.callbacks import AsyncIteratorCallbackHandler

import db_services as _dbs_
from .llm import LLM
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
        self.semaphore = asyncio.Semaphore(3)
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
    ):
        tasks = []
        llm_chain = self._init_llm_chain(20, "")
        for doc in docs:
            doc_id = _dbs_.document.save_doc_to_db(
                self.note_id, self.file_id, self.filename, doc.page_content)
            tasks.append(self._agenerate_questions(
                llm_chain, doc, title, doc_id))

        try:
            await asyncio.wait_for(asyncio.gather(*tasks), timeout=len(docs) * 20)
        except Exception as e:
            _dbs_.file.delete_file(self.file_id)
            raise e

    async def _agenerate_questions(
        self,
        llm_chain: LLMChain,
        doc: Document,
        title: str,
        doc_id: int
    ):
        async with self.semaphore:
            res = await llm_chain.apredict(
                title=title,
                context=doc.page_content
            )
            lines = res.split("\n")
            for question_content in lines:
                _dbs_.question.save_question_to_db(
                    question_content,
                    doc_id
                )

    async def aexamine_answer(
        self,
        id: int,
        context: str,
        question: str,
        answer: str,
        role: str
    ):
        llm_chain = self._init_llm_chain(60, role)
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

    def _init_llm_chain(self, timeout: int, role: str):
        llm_instance = LLM(
            temperature=self.temperature,
            streaming=self.streaming,
            callbacks=self.llm_callbacks,
            timeout=timeout
        )

        prompt = choose_prompt(
            role,
            self.prompt_language,
            self.prompt_type
        )

        return LLMChain(
            prompt=prompt,
            llm=llm_instance.llm,
        )


def check_key_correct():
    try:
        LLM(max_tokens=1).llm([HumanMessage(content="hi")])
    except BaseException as e:
        raise e
    return True


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
