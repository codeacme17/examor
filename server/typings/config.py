from pydantic import BaseModel


class ApiKeys(BaseModel):
    openai_key: str
    azure_key: str
    azure_version: str
    azure_endpoint: str
    pinecone_key: str
    notion_key: str
