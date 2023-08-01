from utils import api_result
from db_services import file as dbs_file
from db_services.MySQLHandler import MySQLHandler


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
    res = dbs_file.get_uploading_files()
    return res
