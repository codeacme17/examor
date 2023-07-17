from pydantic import BaseModel


class ApiKeys(BaseModel):
    openaiKey: str
    azureKey: str
    azureVersion: str
    azureEndpoint: str
    pineconeKey: str
    notionKey: str
