import db_services as _dbs_
from utils import api_result


# Get question count by file id
def get_question_count(file_id: str):
    res = _dbs_.file.get_question_count(file_id)
    if res != 0:
        return api_result.success(res)


# Delete file
def delete_file(file_id: str):
    _dbs_.file.delete_file(file_id)
    return api_result.success("delete file success")


# Get uploading file list
def get_uploading_files():
    res = _dbs_.file.get_uploading_files()
    return res
