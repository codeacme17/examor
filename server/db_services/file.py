from fastapi import UploadFile
from db_services.MySQLHandler import MySQLHandler
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
        file_id = add_file_to_db(note_id=noteId, filename=filename)

        langchain_service = LangchainService(
            note_id=noteId,
            filename=filename,
            prompt_language=language,
            prompt_type="question_generate"
        )

        await langchain_service.agenerate_questions(
            content.decode('utf-8'),
            noteName,
        )

        set_file_is_uploading_state(file_id)


def add_file_to_db(
    note_id: int,
    filename: str
):
    query = """
            INSERT INTO t_file (note_id, file_name) 
            VALUES (%s, %s)
            """
    data = (note_id, filename, )

    res = MySQLHandler().insert_table_data(query, data)
    return res


def set_file_is_uploading_state(
    file_id: int
):
    query = """
             UPDATE t_file
             SET is_uploading = "0"
             WHERE id = %s;
             """
    data = (file_id, )
    MySQLHandler().update_table_data(query, data)
