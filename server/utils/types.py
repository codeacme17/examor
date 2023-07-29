from pydantic import BaseModel


class Profile(BaseModel):
    openaiKey: str
    notionKey: str
    proxy: str


class Icon(BaseModel):
    id: int
    icon: str


class AnswerQuestion(BaseModel):
    id: int
    language: str
    answer: str
