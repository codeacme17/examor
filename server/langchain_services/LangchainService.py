import re
import os
import asyncio
import db_services as _dbs_


from typing import Awaitable
from langchain import LLMChain
from langchain.schema import Document
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chat_models import AzureChatOpenAI
from langchain.callbacks import AsyncIteratorCallbackHandler
from .prompts import choose_prompt


class LangchainService():
    def __init__(
        self,
        note_id: int = 0,
        prompt_language: str = "",
        prompt_type: str = "",
        filename: str = "",
        temperature: int = 0,
        streaming: bool = False
    ):
        self.note_id = note_id
        self.filename = filename
        self.llm_callback = AsyncIteratorCallbackHandler()
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
        llm = AzureChatOpenAI(
            openai_api_base=os.environ["OPENAI_BASE"],
            openai_api_key=os.environ["AZURE_KEY"],
            openai_api_version=os.environ["OPENAI_VERSION"],
            deployment_name=os.environ["DEPLOYMENT_NAME"],
            temperature=temperature,
            streaming=streaming,
        )

        # llm = ChatOpenAI(
        #     model="gpt-3.5-turbo",
        #     temperature=temperature,
        #     streaming=streaming,
        #     verbose=True,
        #     openai_proxy=os.environ['PROXY']
        # )

        prompt = choose_prompt(
            prompt_language,
            prompt_type
        )

        return LLMChain(
            verbose=False,
            prompt=prompt,
            llm=llm,
            callbacks=[self.llm_callback]
        )

    async def agenerate_questions(
        self,
        doc_content: str,
        title: str,
    ):
        docs = self._split_document(doc_content)
        tasks = []

        for doc in docs:
            doc_id = _dbs_.document.save_doc_to_db(
                self.note_id,
                self.filename,
                doc.page_content
            )
            tasks.append(self._agenerate_questions(doc, title, doc_id))

        try:
            await asyncio.wait_for(asyncio.gather(*tasks), timeout=3 * 60)
        except asyncio.TimeoutError:
            await handle_timeout()

    def _split_document(
        self,
        doc_content: str
    ) -> list[Document]:
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1300,
            chunk_overlap=0,
            separators=[
                "\n#{1,6} ",
                "\n\*\*\*+\n",
                "\n___+\n",
            ])

        docs = text_splitter.create_documents([doc_content])
        res = []
        for doc in docs:
            if (self._is_markdown_heading(doc.page_content)):
                continue
            res.append(doc)
        return res

    async def _agenerate_questions(
        self,
        doc: Document,
        title: str,
        doc_id: int
    ):
        res = await self.llm_chain.apredict(
            title=title,
            context=doc.page_content
        )

        lines = res.split("\n")
        for question_content in lines:
            _dbs_.question.save_question_to_db(
                question_content,
                doc_id
            )

    def _is_markdown_heading(self, line):
        pattern = r'^#\s.+'
        return bool(re.match(pattern, line))

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
            callbacks=[self.llm_callback]
        ), self.llm_callback.done)

        task = asyncio.create_task(coroutine)
        exmine = ""
        async for token in self.llm_callback.aiter():
            exmine += token
            yield f"{token}"
        await task

        await _dbs_.question.update_question_state(id, f"{answer} ||| {exmine}")


async def handle_timeout():
    print("Tasks took too long and timed out!")


async def wait_done(
    fn: Awaitable,
    event: asyncio.Event
):
    try:
        await fn
    except Exception as e:
        print(e)
        event.set()
    finally:
        event.set()
