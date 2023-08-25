import db_services as _dbs_

from utils import api_result
from db_services.MySQLHandler import MySQLHandler


# Delete file
def delete_file(file_id: str):
    _dbs_.file.delete_file(file_id)
    return api_result.success("delete file success")


# Get uploading file list
def get_uploading_files():
    res = _dbs_.file.get_uploading_files()
    return res
