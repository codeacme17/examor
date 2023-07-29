from fastapi.responses import StreamingResponse
from utils.MySQLHandler import MySQLHandler
from utils import api_result
from utils.share import get_note_info, get_document_info, get_question_info
from langchain_services.LangchainService import LangchainService


def _get_questions_by_note_id(
    note_id: int,
):
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


async def _answer_question(
    note_id: int,
    document_id: int,
    question_content: str,
    answer: str,
    language: str
):
    print(note_id, answer, language)

    langchain_service = LangchainService(
        note_id=note_id,
        prompt_language=language,
        prompt_type="answer_examine"
    )

    note_info = get_note_info(note_id)
    document_info = get_document_info(document_id)

    temp = langchain_service.aexamine_answer(
        title=note_info["name"],
        context=document_info["document"],
        quesiton=question_content,
        answer=answer
    )

    return StreamingResponse(temp, media_type="text/event-stream")
