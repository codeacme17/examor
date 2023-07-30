from fastapi import File, Form, UploadFile
from utils import api_result, types
from utils.share import upload_file
from utils.MySQLHandler import MySQLHandler


def _get_notes():
    select_query = "SELECT * FROM t_note"
    res = MySQLHandler().execute_query(select_query)
    return api_result.success(res)


def _get_note(id: int):
    query_data = (id,)
    select_query = "SELECT * FROM t_note WHERE id = %s"
    res = MySQLHandler().execute_query(select_query, query_data, single=True)
    return api_result.success(res)


async def _add_note(
    language: str,
    noteName: str = Form(),
    files: list[UploadFile] = File(default=None),
    notionId: str = Form(default=None),
):
    query_data = (noteName,)
    duplicate_query = "SELECT * FROM t_note WHERE name = %s"
    duplicate = MySQLHandler().execute_query(duplicate_query, query_data)

    if (len(duplicate)):
        return api_result.error("The same note name cannot be created repeatedly")

    insert_query = "INSERT INTO t_note (name) VALUES (%s)"
    noteId = MySQLHandler().insert_table_data(insert_query, query_data)

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
