from fastapi.responses import StreamingResponse
from utils.MySQLHandler import MySQLHandler
from utils import api_result
from utils.share import get_note_info, get_document_info, get_question_info
from langchain_services.LangchainService import LangchainService


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


def _answer_question(body: dict):
    langchain_service = LangchainService(
        prompt_language=body["language"],
        prompt_type="answer_examine",
        streaming=True
    )

    document_info = get_document_info(body["document_id"])

    return langchain_service.aexamine_answer(
        title=body["note_name"],
        context=document_info["document"],
        quesiton=body["question_content"],
        answer=body["answer"]
    )
