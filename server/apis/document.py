import json
from fastapi import File, Form, UploadFile
from utils import api_result
from db_services.MySQLHandler import MySQLHandler


def _get_files_by_noteId(noteId):
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


def _add_file_to_note(
    note_id: str = Form(),
    files: list[UploadFile] = File(default=None),
    notion_id: str = Form(default=None),
):
    query = """
            SELECT note_id, file_name, COUNT(*) as duplicate_count
            FROM t_document
            GROUP BY %s, %s
            HAVING COUNT(*) > 1;
            """
    data = (note_id, )


def _delete_file(
    note_id: str,
    file_name: str
):
    query = """
            DELETE FROM t_document
            WHERE note_id = %s
            AND file_name = %s;
            """
    data = (note_id, file_name, )
    MySQLHandler().delete_table_data(query, data)
    return api_result.success("delete file success")


def _get_uploading_files():
    content = None
    with open("uploading_files.json", "r", encoding="utf-8") as f:
        content = f.read()

    return content
