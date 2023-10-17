from pydantic import BaseModel
from fastapi import File, Form, UploadFile


class Profile(BaseModel):
    questionAmount: str = ""
    currentRole: str = ""
    currentModel: str = ""
    openaiModel: str = ""
    openaiKey: str = ""
    openaiOrganization: str = ""
    openaiBase: str = ""
    openaiProxy: str = ""
    azureKey: str = ""
    azureBase: str = ""
    openaiVersion: str = ""
    deploymentName: str = ""
    anthropicModel: str = ""
    anthropicKey: str = ""
    anthropicVersion = ""
    notionKey: str = ""
    proxy: str = ""


class Icon(BaseModel):
    id: int
    icon: str


class AnswerQuestion(BaseModel):
    id: int
    language: str
    answer: str


class AddNoteData(BaseModel):
    language: str
    questionType: str
    noteName: str = Form()
    files: list[UploadFile] = File(default=None)
    notionId: str = Form(default=None)


class ImportBankData(BaseModel):
    import_type: str
    note_id: int
    note_name: str
    language: str
    category: str
    bank_name: str
