import re

from db_services.MySQLHandler import MySQLHandler


def _save_question_to_db(
    question_content: str,
    document_id: int,
):

    question_content = remove_prefix_numbers(question_content)
    query = """
            INSERT INTO t_question (content, document_id) 
            VALUES (%s, %s)
            """
    data = (question_content, document_id,)
    MySQLHandler().insert_table_data(
        query,
        data
    )


async def _update_question_state(
    id: int,
    answer: str,
):
    query = """
            UPDATE t_question
            SET last_answer = %s, progress = %s, is_answered_today = %s
            WHERE id = %s;
            """
    data = (answer, 5, "1", id, )
    MySQLHandler().update_table_data(query, data)


def remove_prefix_numbers(text):
    cleaned_text = re.sub(r'^\s*(?:\d+\.|-)\s*', '', text)
    return cleaned_text.strip()
