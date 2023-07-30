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
            note_id=noteId,
            filename=filename,
            prompt_language=language,
            prompt_type="question_generate"
        )

        await langchain_service.agenerate_questions(
            content.decode('utf-8'),
            noteName,
        )


def get_note_info(
    note_id: int
):
    query = """
            SELECT *
            FROM t_note
            WHERE id = %s
            """
    data = (note_id, )

    res = MySQLHandler().execute_query(query, data, single=True)
    return res


def get_document_info(
    document_id: int
):
    query = """
            SELECT *
            FROM t_document
            WHERE id = %s
            """
    data = (document_id, )

    res = MySQLHandler().execute_query(query, data, single=True)
    return res


def get_question_info(
    question_id: int
):
    query = """
            SELECT *
            FROM t_question
            WHERE id = %s
            """
    data = (question_id, )

    res = MySQLHandler().execute_query(query, data, single=True)
    return res


def get_note_info_by_quesiton_id(
    question_id: int
):
    query = """
            SELECT n.*
            FROM t_note n
            WHERE n.document_id = (
                SELECT document_id
                FROM t_question
                WHERE id = %s
            );
            """
    data = (question_id, )
    res = MySQLHandler().execute_query(query, data)

    print(res)
    return res
