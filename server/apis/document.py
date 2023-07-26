from fastapi import File, Form, UploadFile

from utils import api_result
from utils.MySQLHandler import MySQLHandler


def _get_files_by_noteId(noteId):
    query = """
            SELECT DISTINCT file_name
            FROM t_document
            WHERE note_id = %s
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

    pass
