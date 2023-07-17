from pydantic import BaseModel


class Profile(BaseModel):
    openaiKey: str
    notionKey: str

    proxy: str
