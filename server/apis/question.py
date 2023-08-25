import db_services as _dbs_

from lang_chain import Chain
from utils import api_result, types


def examine_question(data: types.AnswerQuestion):
    question_info = _dbs_.question.get_question_by_id(data.id)
    document_info = _dbs_.document.get_document_by_id(
        question_info["document_id"])

    langchain_service = Chain(
        prompt_language=data.language,
        prompt_type="answer_examine",
        streaming=True
    )

    return langchain_service.aexamine_answer(
        id=data.id,
        context=document_info["document"],
        question=question_info["content"],
        role=question_info["designated_role"],
        answer=data.answer
    )


def get_last_answer(id: int):
    question_info = _dbs_.question.get_question_by_id(id)
    return api_result.success(question_info["last_answer"])


def get_document(id: int):
    question_info = _dbs_.question.get_question_by_id(id)
    document_info = _dbs_.document.get_document_by_id(
        question_info["document_id"])
    return api_result.success(document_info["document"])


def get_random_question():
    question_info = _dbs_.question.get_random_question_info()

    if (question_info is None):
        return api_result.success("empty")

    document_info = _dbs_.document.get_document_by_id(
        question_info["document_id"])
    note_info = _dbs_.note.get_note_by_id(document_info["note_id"])

    return api_result.success({
        "id": question_info["id"],
        "content": question_info["content"],
        "designated_role": question_info["designated_role"],
        "progress": question_info["progress"],
        "note_name": note_info["name"]
    })
