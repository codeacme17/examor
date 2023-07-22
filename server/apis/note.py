from fastapi import UploadFile
from fastapi import File, Form, UploadFile

from utils import api_result
from utils.MySQLHandler import MySQLHandler
from typings.note_types import Icon


def _get_notes():
    select_query = "SELECT * FROM t_note"
    res = MySQLHandler().execute_query(select_query)
    return api_result.success(res)


def _get_note(id: int):
    query_data = (id,)
    select_query = "SELECT * FROM t_note WHERE id = %s"
    res = MySQLHandler().execute_query(select_query, query_data, single=True)
    return api_result.success(res)


def _add_note(
    noteName: str = Form(),
    files: UploadFile = File(default=None),
    notionId: str = Form(default=None)
):
    query_data = (noteName,)
    duplicate_query = "SELECT * FROM t_note WHERE name = %s"
    insert_query = "INSERT INTO t_note (name) VALUES (%s)"

    duplicate = MySQLHandler().execute_query(duplicate_query, query_data)
    if (len(duplicate)):
        return api_result.error("The same note name cannot be created repeatedly")

    MySQLHandler().insert_table_data(insert_query, query_data)
    return api_result.success()


def _delete_note(id: int):
    MySQLHandler().delete_table_data('t_note', id)
    return api_result.success()


def _update_note_icon(data: Icon):
    table_name = "t_note"
    id = f"id = {data.id}"
    icon = f"icon = '{data.icon}'"

    MySQLHandler().update_table_data(table_name, icon, id)
    return api_result.success()
