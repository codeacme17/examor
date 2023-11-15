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
    question_type: str,
    designated_role: str
):
    query = """
            INSERT INTO t_question (content, document_id, designated_role, question_type) 
            VALUES (%s, %s, %s, %s)
            """
    data = (
        question_content,
        document_id,
        designated_role,
        question_type,
    )
    MySQLHandler().insert_table_data(query, data)


async def update_question_state(
    id: int,
    answer: str,
    score: str,
    push_date: str
):
    query = """
            UPDATE t_question
            SET last_answer = %s, progress = progress + %s, is_answered_today = %s, push_date = %s
            WHERE id = %s;
            """
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


def get_expired_questions(note_id: int, question_amount: int):
    now_date = datetime.date.today().strftime('%Y-%m-%d')
    query = """
            SELECT q.*
            FROM t_question q
            JOIN t_document d ON q.document_id = d.id
            WHERE d.note_id = %s AND q.push_date < %s
            ORDER BY q.push_date DESC
            LIMIT %s;
            """
    data = (note_id, now_date, question_amount, )
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
