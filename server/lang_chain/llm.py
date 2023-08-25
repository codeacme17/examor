import os

from langchain.chat_models import AzureChatOpenAI, ChatOpenAI


class LLM:
    def __init__(
        self,
        temperature: int = 0,
        streaming: bool = False,
        callbacks: list = [],
        max_retries=3,
        max_tokens=None,
        timeout=10
    ):
        self.temperature = temperature if temperature != 0 else self._get_role_temperature()
        self.streaming = streaming
        self.callbacks = callbacks
        self.max_retries = max_retries
        self.max_tokens = max_tokens
        self.timeout = timeout
        self.llm = self._init_llm()

    def _init_llm(self):
        llm = None
        if (os.environ["CURRENT_MODEL"] == "Azure"):
            llm = self._init_azure()
        if (os.environ["CURRENT_MODEL"] == "OpenAI"):
            llm = self._init_openai()
        return llm

    def _init_azure(self) -> AzureChatOpenAI:
        return AzureChatOpenAI(
            openai_api_base=os.environ["OPENAI_BASE"],
            openai_api_key=os.environ["AZURE_KEY"],
            openai_api_version=os.environ["OPENAI_VERSION"],
            deployment_name=os.environ["DEPLOYMENT_NAME"],
            temperature=self.temperature,
            streaming=self.streaming,
            callbacks=self.callbacks,
            max_retries=self.max_retries,
            max_tokens=self.max_tokens,
            request_timeout=self.timeout,
        )

    def _init_openai(self) -> ChatOpenAI:
        return ChatOpenAI(
            model="gpt-3.5-turbo",
            temperature=self.temperature,
            streaming=self.streaming,
            callbacks=self.callbacks,
            max_retries=self.max_retries,
            max_tokens=self.max_tokens,
            openai_proxy=os.environ['PROXY'] if os.environ['PROXY'] != "http://" else None,
            request_timeout=self.timeout,
        )

    def _get_role_temperature(self):
        if (os.environ.get("CURRENT_ROLE") == "examiner"):
            return 0
        if (os.environ.get("CURRENT_ROLE") == "teacher"):
            return 0.5
        if (os.environ.get("CURRENT_ROLE") == "interviewer"):
            return 0.9
