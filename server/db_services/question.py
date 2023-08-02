import re
import datetime

from db_services.MySQLHandler import MySQLHandler


def save_question_to_db(
    question_content: str,
    document_id: int,
):
    question_content = remove_prefix_numbers(question_content)
    query = """
            INSERT INTO t_question (content, document_id) 
            VALUES (%s, %s)
            """
    data = (question_content, document_id, )
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
    score = extract_score(answer)
    print(score)

    push_date = get_push_date(score)
    data = (answer, score, "1", push_date, id, )
    MySQLHandler().update_table_data(query, data)


def remove_prefix_numbers(text):
    cleaned_text = re.sub(r'^\s*(?:\d+\.|-)\s*', '', text)
    return cleaned_text.strip()


def extract_score(anwser: str):
    score = re.findall(r"\d+\.?\d*", anwser)
    if score:
        return int(score[0])
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
            WHERE d.note_id = %s AND q.push_date IS NULL
            LIMIT %s;                
            """
    data = (note_id, gap_count, )
    return MySQLHandler().execute_query(query, data)
