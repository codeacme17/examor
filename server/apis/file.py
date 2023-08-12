import db_services as _dbs_

from utils import api_result
from db_services.MySQLHandler import MySQLHandler


# Delete file
def delete_file(file_id: str):
    query = """
            DELETE FROM t_file
            WHERE file_id = %s;
            """
    data = (file_id,  )
    MySQLHandler().delete_table_data(query, data)
    return api_result.success("delete file success")


# Get uploading file list
def get_uploading_files():
    res = _dbs_.file.get_uploading_files()
    return res
