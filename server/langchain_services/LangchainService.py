import asyncio
import re
import os

from langchain import LLMChain
from langchain.schema import Document
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chat_models import AzureChatOpenAI
from langchain.callbacks import StdOutCallbackHandler

from .prompts import choose_prompt

OPENAI_API_VERSION = os.environ.get("OPENAI_VERSION")
OPENAI_API_BASE = os.environ.get("OPENAI_BASE")
OPENAI_API_KEY = os.environ.get("AZURE_KEY")
DEPLOYMENT_NAME = os.environ.get("DEPLOYMENT_NAME")

print(OPENAI_API_VERSION, "-------")


class LangchainService():
    def __init__(
        self,
        prompt_language: str,
        prompt_type: str,
        temperature: int = 0,
        streaming: bool = False
    ):
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
        azure_llm = AzureChatOpenAI(
            verbose=True,
            openai_api_base=OPENAI_API_BASE,
            openai_api_key=OPENAI_API_KEY,
            openai_api_version=OPENAI_API_VERSION,
            deployment_name=DEPLOYMENT_NAME,
            temperature=temperature,
            streaming=streaming
        )

        prompt = choose_prompt(
            prompt_language,
            prompt_type
        )

        return LLMChain(
            prompt=prompt,
            llm=azure_llm,
        )

    async def agenerate_questions(
        self,
        doc_content: str,
        title: str,
    ):
        docs = self._split_document(doc_content)
        tasks = [self._agenerate_questions(
            doc,
            title
        ) for doc in docs]
        questions = await asyncio.gather(*tasks)
        return questions

    def _split_document(self, doc_content: str):
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
            if (self.is_markdown_heading(doc.page_content)):
                continue
            res.append(doc)

        return res

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

        print(res)

    def is_markdown_heading(self, line):
        pattern = r'^#\s.+'
        return bool(re.match(pattern, line))
