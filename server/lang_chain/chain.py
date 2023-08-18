import re
import asyncio
from typing import Awaitable
from langchain import LLMChain
from langchain.schema import Document, HumanMessage
from langchain.callbacks import AsyncIteratorCallbackHandler

import db_services as _dbs_
from .llm import LLM
from prompts import choose_prompt
from prompts import get_qg_role_command


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
        self.llm_callbacks = [AsyncIteratorCallbackHandler()]
        self.llm_chain = self._init_llm_chain(
            prompt_language,
            prompt_type,
            temperature,
            streaming
        )

    def _init_llm_chain(
        self,
        prompt_language: str,
        prompt_type: str,
        temperature: int = 0,
        streaming: bool = False
    ):
        llm_instance = LLM(
            temperature=temperature,
            streaming=streaming,
            callbacks=self.llm_callbacks
        )

        prompt = choose_prompt(
            prompt_language,
            prompt_type
        )

        return LLMChain(
            prompt=prompt,
            llm=llm_instance.llm,
        )

    async def agenerate_questions(
        self,
        docs: list[Document],
        title: str,
    ):
        tasks = []
        for doc in docs:
            doc_id = _dbs_.document.save_doc_to_db(
                self.note_id,
                self.file_id,
                self.filename,
                doc.page_content
            )
            tasks.append(self._agenerate_questions(doc, title, doc_id))

        try:
            await asyncio.wait_for(asyncio.gather(*tasks), timeout=len(docs) * 20)
        except asyncio.TimeoutError:
            await handle_timeout()

    async def _agenerate_questions(
        self,
        doc: Document,
        title: str,
        doc_id: int
    ):
        async with self.semaphore:
            res = await self.llm_chain.apredict(
                command=get_qg_role_command(),
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
        title: str,
        context: str,
        quesiton: str,
        answer: str
    ):
        coroutine = wait_done(self.llm_chain.apredict(
            title=title,
            context=context,
            quesiton=quesiton,
            answer=answer,
            callbacks=self.llm_callbacks
        ), self.llm_callbacks[0].done)

        task = asyncio.create_task(coroutine)
        exmine = ""
        async for token in self.llm_callbacks[0].aiter():
            exmine += token
            yield f"{token}"
        await task
        await _dbs_.question.update_question_state(id, f"{answer} ||| {exmine}")


def check_key_correct():
    try:
        LLM(max_tokens=1).llm([HumanMessage(content="hi")])
    except BaseException as e:
        raise e
    return True


async def handle_timeout():
    print("Tasks took too long and timed out!")


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
