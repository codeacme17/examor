import db_services as _dbs_

from utils import api_result, types
from db_services.MySQLHandler import MySQLHandler
from langchain_services import LangchainService, check_key_correct


def examine_question(data: types.AnswerQuestion):
    question_info = _dbs_.share.get_question_info(data.id)
    document_info = _dbs_.share.get_document_info(question_info["document_id"])
    note_info = _dbs_.share.get_note_info(document_info["note_id"])

    langchain_service = LangchainService(
        prompt_language=data.language,
        prompt_type="answer_examine",
        streaming=True
    )

    return langchain_service.aexamine_answer(
        id=data.id,
        title=note_info["name"],
        context=document_info["document"],
        quesiton=question_info["content"],
        answer=data.answer
    )


def get_last_answer(id: int):
    question_info = _dbs_.share.get_question_info(id)
    return api_result.success(question_info["last_answer"])


def get_document(id: int):
    question_info = _dbs_.share.get_question_info(id)
    document_info = _dbs_.share.get_document_info(question_info["document_id"])
    return api_result.success(document_info["document"])


def get_random_question():
    query = """
            SELECT *
            FROM t_question
            WHERE is_answered_today != '1' AND is_pushed_today = '0'
            ORDER BY RAND()
            LIMIT 1;
            """
    question_info = MySQLHandler().execute_query(query, single=True)

    if (question_info is None):
        return api_result.success("empty")

    document_info = _dbs_.share.get_document_info(question_info["document_id"])
    note_info = _dbs_.share.get_note_info(document_info["note_id"])

    return api_result.success({
        "id": question_info["id"],
        "content": question_info["content"],
        "progress": question_info["progress"],
        "note_name": note_info["name"]
    })
