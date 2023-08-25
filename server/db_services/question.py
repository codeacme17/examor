import re
import os
import datetime

from db_services.MySQLHandler import MySQLHandler


def get_question_by_id(id: int):
    query = """
            SELECT *
            FROM t_question
            WHERE id = %s
            """
    data = (id, )
    return MySQLHandler().execute_query(query, data, single=True)


def save_question_to_db(
    question_content: str,
    document_id: int,
):
    question_content = remove_prefix_numbers(question_content)
    query = """
            INSERT INTO t_question (content, document_id, designated_role) 
            VALUES (%s, %s, %s)
            """
    data = (question_content, document_id, os.environ.get("CURRENT_ROLE"), )
    MySQLHandler().insert_table_data(query, data)


async def update_question_state(
    id: int,
    answer: str,
):
    query = """
            UPDATE t_question
            SET last_answer = %s, progress = progress + %s, is_answered_today = %s, push_date = %s
            WHERE id = %s;
            """
    chunks = answer.split("|||")
    score = extract_score(chunks[1])
    push_date = get_push_date(score)
    data = (answer, score, "1", push_date, id, )
    MySQLHandler().update_table_data(query, data)


def get_random_question_info():
    query = """
            SELECT *
            FROM t_question
            WHERE is_answered_today != '1' AND is_pushed_today = '0'
            ORDER BY RAND()
            LIMIT 1;
            """
    return MySQLHandler().execute_query(query, single=True)


def remove_prefix_numbers(text):
    cleaned_text = re.sub(r'^\s*(?:\d+\.|-)\s*', '', text)
    return cleaned_text.strip()


def extract_score(anwser: str):
    score = re.findall(r"\d+\.?\d*", anwser)
    if score:
        return int(float(score[0]))
    else:
        return 0


def get_push_date(score: int):
    now = datetime.datetime.now()
    days = 0

    if (0 <= score <= 3):
        days = 1
    if (4 <= score <= 6):
        days = 3
    if (7 <= score <= 9):
        days = 7
    if (10 == score):
        days = 14

    return ((now+datetime.timedelta(days)).strftime("%Y-%m-%d"))


def get_expired_questions(note_id: int):
    now_date = datetime.date.today().strftime('%Y-%m-%d')
    query = """
            SELECT q.*
            FROM t_question q
            JOIN t_document d ON q.document_id = d.id
            WHERE d.note_id = %s AND q.push_date < %s
            ORDER BY q.push_date DESC
            LIMIT 10;
            """
    data = (note_id, now_date, )
    return MySQLHandler().execute_query(query, data)


def get_today_questions(note_id: int, gap_count: int):
    now_date = datetime.date.today().strftime('%Y-%m-%d')
    query = """
            SELECT q.*
            FROM t_question q
            JOIN t_document d ON q.document_id = d.id
            WHERE d.note_id = %s AND q.push_date = %s
            LIMIT %s;            
            """
    data = (note_id, now_date, gap_count, )
    return MySQLHandler().execute_query(query, data)


def get_supplement_questions(note_id: int, gap_count: int):
    query = """
            SELECT q.*
            FROM t_question q
            JOIN t_document d ON q.document_id = d.id
            WHERE d.note_id = %s AND q.push_date IS NULL AND q.is_pushed_today = '0'
            ORDER BY RAND()
            LIMIT %s;                
            """
    data = (note_id, gap_count, )
    questions = MySQLHandler().execute_query(query, data)

    if questions:
        question_ids = [question['id'] for question in questions]
        update_query = """
                        UPDATE t_question
                        SET is_pushed_today = '1'
                        WHERE id IN ({});
                        """.format(','.join(map(str, question_ids)))
        MySQLHandler().update_table_data(update_query)

    return questions
