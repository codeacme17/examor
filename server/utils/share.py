from fastapi import UploadFile
from utils.tools import CustomError
from langchain_services.LangchainService import LangchainService


async def upload_file(
    language: str,
    noteId: int,
    noteName: str,
    files: list[UploadFile],
):
    for file in files:
        filename = file.filename
        content = await file.read()

        langchain_service = LangchainService(
            noteId,
            filename,
            language,
            "question_generate"
        )

        questions = await langchain_service.agenerate_questions(
            content.decode('utf-8'),
            noteName,
        )

        print(questions)
