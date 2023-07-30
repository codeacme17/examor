from utils.MySQLHandler import MySQLHandler
from utils import api_result
from utils.share import get_note_info, get_document_info, get_question_info, get_note_info_by_quesiton_id
from langchain_services.LangchainService import LangchainService
from utils import types


def _get_questions_by_note_id(note_id: int):
    query = """
            SELECT q.*
            FROM t_question q
            JOIN t_document d ON q.document_id = d.id
            WHERE d.note_id = %s
            LIMIT 10;            
            """
    data = (note_id, )
    res = MySQLHandler().execute_query(query, data)
    return api_result.success(res)


def _answer_question(data: types.AnswerQuestion):
    question_info = get_question_info(data.id)
    document_info = get_document_info(question_info["document_id"])
    note_info = get_note_info(document_info["note_id"])

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


def _get_last_answer(id: int):
    question_info = get_question_info(id)
    return api_result.success(question_info["last_answer"])


def _get_document(id: int):
    question_info = get_question_info(id)
    document_info = get_document_info(question_info["document_id"])

    return api_result.success(document_info["document"])


def _get_random_question():
    query = """
            SELECT *
            FROM t_question
            WHERE is_pushed != '1' AND is_answered_today != '1'
            ORDER BY RAND()
            LIMIT 1;
            """

    question_info = MySQLHandler().execute_query(query, single=True)
    document_info = get_document_info(question_info["document_id"])
    note_info = get_note_info(document_info["note_id"])

    res = {
        "id": question_info["id"],
        "content": question_info["content"],
        "progress": question_info["progress"],
        "note_name": note_info["name"]
    }

    return api_result.success(res)
