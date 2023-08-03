import os
import db_services as _dbs_

from fastapi import File, Form, UploadFile
from utils import api_result, types
from db_services.MySQLHandler import MySQLHandler


# Get notes list
def get_notes():
    query = """
            SELECT * 
            FROM t_note
            """
    res = MySQLHandler().execute_query(query)
    return api_result.success(res)


# Get note info
def get_note(id: int):
    query = """
            SELECT * 
            FROM t_note 
            WHERE id = %s
            """
    data = (id, )
    res = MySQLHandler().execute_query(query, data, single=True)
    return api_result.success(res)


# Get file list by note id
def get_files_by_noteId(noteId):
    query = """
            SELECT file_name, MAX(upload_date) as upload_date
            FROM t_document
            WHERE note_id = %s
            GROUP BY file_name
            HAVING COUNT(file_name) > 1;
            """
    data = (noteId, )
    res = MySQLHandler().execute_query(query, data)
    return api_result.success(res)


# Get question list by note id
def get_questions_by_note_id(note_id: int):
    LIMIT_QUESTIONS = int(os.environ["QUESTION_AMOUNT"])

    expired_questions = _dbs_.question.get_expired_questions(note_id)
    gap = 0 if LIMIT_QUESTIONS - \
        len(expired_questions) < 0 else LIMIT_QUESTIONS - len(expired_questions)

    today_questions = _dbs_.question.get_today_questions(note_id, gap)
    gap = 0 if gap - \
        len(today_questions) < 0 else LIMIT_QUESTIONS - len(today_questions)

    supplement_questions = _dbs_.question.get_supplement_questions(
        note_id,
        gap
    )

    return api_result.success({
        "expired": expired_questions,
        "today":  today_questions,
        "supplement": supplement_questions
    })


# Add new note
async def add_note(
    language: str,
    noteName: str = Form(),
    files: list[UploadFile] = File(default=None),
    notionId: str = Form(default=None),
):
    if (_dbs_.share.is_duplicate_note('t_note', noteName)):
        return api_result.error("The same note name cannot be created repeatedly")

    query = """
            INSERT INTO t_note (name) 
            VALUES (%s)
            """
    data = (noteName,)
    noteId = MySQLHandler().insert_table_data(query, data)

    if (len(files) > 0):
        await _dbs_.file.upload_file(language, noteId, noteName, files)

    if (notionId is not None):
        pass

    return api_result.success("add note successfully")


# Delete note by note id
def delete_note(id: int):
    query = """
            DELETE FROM t_note
            WHERE id = %s;
            """
    data = (id, )
    MySQLHandler().delete_table_data(query, data)
    return api_result.success()


# Update note icon
def update_note_icon(data: types.Icon):
    query = """
            UPDATE t_note
            SET icon = %s
            WHERE id = %s;
            """
    data = (data.icon, data.id, )
    MySQLHandler().update_table_data(query, data, )
    return api_result.success()
