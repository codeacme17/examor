import asyncio
import re
import os
import socks
import socket

from langchain import LLMChain
from langchain.schema import Document
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chat_models import AzureChatOpenAI, ChatOpenAI
from langchain.callbacks import StdOutCallbackHandler

from .prompts import choose_prompt


class LangchainService():
    def __init__(
        self,
        prompt_language: str,
        prompt_type: str,
        temperature: int = 0,
        streaming: bool = False
    ):
        proxy_host = '127.0.0.1'
        proxy_port = 1086

        socks.set_default_proxy(socks.SOCKS5, proxy_host, proxy_port)
        socket.socket = socks.socksocket

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
            verbose=True,
            openai_api_base=os.environ["OPENAI_BASE"],
            openai_api_key=os.environ["AZURE_KEY"],
            openai_api_version=os.environ["OPENAI_VERSION"],
            deployment_name=os.environ["DEPLOYMENT_NAME"],
            temperature=temperature,
            streaming=streaming
        )

        # llm = ChatOpenAI(
        #     model="gpt-3.5-turbo",
        #     temperature=temperature,
        #     streaming=streaming
        # )

        prompt = choose_prompt(
            prompt_language,
            prompt_type
        )

        return LLMChain(
            prompt=prompt,
            llm=llm,
        )

    def split_document(self, doc_content: str) -> list[Document]:
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
            print(doc.page_content)
            if (self.is_markdown_heading(doc.page_content)):
                continue
            res.append(doc)

        return res

    async def agenerate_questions(
        self,
        docs: list[Document],
        title: str,
    ):
        tasks = [self._agenerate_questions(
            doc,
            title
        ) for doc in docs]

        questions = await asyncio.gather(*tasks)
        return questions

    async def _agenerate_questions(
        self,
        doc: Document,
        title: str,
    ):
        res = await self.llm_chain.apredict(
            title=title,
            context=doc.page_content
        )

        lines = res.split("\n")
        return lines

    async def aexamine_answer(
        self,
        title: str,
        context: str,
        quesiton: str,
        answer: str
    ):
        res = await self.llm_chain.apredict(
            title=title,
            context=context,
            quesiton=quesiton,
            answer=answer,
            callbacks=[StdOutCallbackHandler()]
        )

    def is_markdown_heading(self, line):
        pattern = r'^#\s.+'
        return bool(re.match(pattern, line))
