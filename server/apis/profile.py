from fastapi import File, UploadFile
from fastapi.responses import FileResponse, JSONResponse

import db_services as _dbs_
import llm_services as _llms_

from utils import api_result, types


def get_profile():
    data = _dbs_.profile.get_profile()
    return api_result.success(data)


def set_profile(data: types.Profile):
    _dbs_.profile.set_profile(data)
    _dbs_.profile.set_profile_to_env()
    return api_result.success()


def check_llm_api_state():
    try:
        payment = _llms_.check_llm_api_state()
    except Exception as e:
        return api_result.error(str(e))

    return api_result.success(payment)


def export_data(isProfile: bool, isNotes: bool):
    if (isProfile == False and isNotes == False):
        return api_result.error("Must export at least one type data")

    try:
        _dbs_.profile.export_data(isProfile, isNotes)
    except Exception as e:
        return api_result.error(str(e))

    return FileResponse("data.xlsx", headers={
        "Content-Disposition": "attachment; filename=data.xlsx"
    })


def import_data(file: UploadFile = File()):
    if file.content_type != "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
        return api_result.error("Only .xlsx files are allowed")

    file_path = "data.xlsx"
    with open(file_path, "wb") as f:
        f.write(file.file.read())

    try:
        _dbs_.profile.import_data()
    except Exception as e:
        return api_result.error(str(e))

    return api_result.success("File uploaded and saved as data.xlsx")
