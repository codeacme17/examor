from pydantic import BaseModel


class Profile(BaseModel):
    questionAmount: str = None
    currentRole: str = None
    currentModel: str = None
    openaiKey: str = None
    openaiOrganization: str = None
    openaiBase: str = None
    azureKey: str = None
    azureBase: str = None
    openaiVersion: str = None
    deploymentName: str = None
    notionKey: str = None
    proxy: str = None


class Icon(BaseModel):
    id: int
    icon: str


class AnswerQuestion(BaseModel):
    id: int
    language: str
    answer: str
