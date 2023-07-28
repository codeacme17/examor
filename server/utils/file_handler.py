from fastapi import UploadFile
from utils.MySQLHandler import MySQLHandler
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
            language,
            "question_generate"
        )

        docs = langchain_service.split_document(content.decode('utf-8'))

        questions = await langchain_service.agenerate_questions(
            docs,
            noteName,
        )

        for doc in docs:
            save_doc_to_db(noteId, filename, doc.page_content)

        print(questions)


def save_doc_to_db(noteId, filename, doc):
    insert_query = "INSERT INTO t_document (note_id, file_name, document) VALUES (%s, %s, %s)"
    query_data = (
        noteId,
        filename,
        doc,
    )
    MySQLHandler().insert_table_data(
        insert_query,
        query_data
    )
