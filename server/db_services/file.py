from fastapi import UploadFile

from db_services.MySQLHandler import MySQLHandler
from langchain_services.LangchainService import LangchainService
from loaders import split_doc


async def upload_file(
    language: str,
    noteId: int,
    noteName: str,
    files: list[UploadFile],
):
    for file in files:
        filename = file.filename
        file_type = file.content_type
        file_id = add_file_to_db(note_id=noteId, filename=filename)
        file_content = await file.read()
        docs = split_doc(file_type, file_content.decode('utf-8'))

        langchain_service = LangchainService(
            note_id=noteId,
            file_id=file_id,
            filename=filename,
            prompt_language=language,
            prompt_type="question_generate"
        )

        await langchain_service.agenerate_questions(
            docs,
            noteName,
        )

        set_file_is_uploading_state(file_id)
        print(f">>>>>>>>> {filename} upload success  <<<<<<<<<")


def add_file_to_db(
    note_id: int,
    filename: str
):
    query = """
            INSERT INTO t_file (note_id, file_name) 
            VALUES (%s, %s)
            """
    data = (note_id, filename, )
    return MySQLHandler().insert_table_data(query, data)


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


def get_uploading_files():
    query = """
            SELECT id, note_id, file_name
            FROM t_file
            WHERE is_uploading = "1";
            """
    return MySQLHandler().execute_query(query)
