import db_services as _dbs_

from utils import api_result
from db_services.MySQLHandler import MySQLHandler


# Delete file
def delete_file(
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


# Get uploading file list
def get_uploading_files():
    res = _dbs_.file.get_uploading_files()
    return res
