from fastapi import File, Form, UploadFile
from utils import api_result, types
from db_services.file import upload_file
from db_services.MySQLHandler import MySQLHandler
from db_services.share import is_key_name_duplicate_in_table


def _get_notes():
    query = """
            SELECT * 
            FROM t_note
            """
    res = MySQLHandler().execute_query(query)
    return api_result.success(res)


def _get_note(id: int):
    query = """
            SELECT * 
            FROM t_note 
            WHERE id = %s
            """
    data = (id, )
    res = MySQLHandler().execute_query(query, data, single=True)
    return api_result.success(res)


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


async def _add_note(
    language: str,
    noteName: str = Form(),
    files: list[UploadFile] = File(default=None),
    notionId: str = Form(default=None),
):

    if (is_key_name_duplicate_in_table("t_note", noteName)):
        return api_result.error("The same note name cannot be created repeatedly")

    query = """
            INSERT INTO t_note (name) 
            VALUES (%s)
            """
    data = (noteName,)
    noteId = MySQLHandler().insert_table_data(query, data)

    if (len(files) > 0):
        await upload_file(language, noteId, noteName, files)

    if (notionId is not None):
        pass

    return api_result.success("add note successfully")


def _delete_note(id: int):
    query = """
            DELETE FROM t_note
            WHERE id = %s;
            """
    data = (id, )
    MySQLHandler().delete_table_data(query, data)
    return api_result.success()


def _update_note_icon(data: types.Icon):
    query = """
            UPDATE t_note
            SET icon = %s
            WHERE id = %s;
            """
    data = (data.icon, data.id, )
    MySQLHandler().update_table_data(query, data, )
    return api_result.success()
