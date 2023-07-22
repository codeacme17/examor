from fastapi import FastAPI, File, Form, UploadFile
from typings.profile_types import Profile
from typings.note_types import Icon

from utils.MySQLHandler import MySQLHandler
from utils.profile_handler import set_profile_to_env
from apis.profile import _set_profile, _get_profile
from apis.note import _get_notes, _get_note, _add_note, _update_note_icon

from utils.dummy_data import insert, clear

app = FastAPI(validate_headers=False)


@app.on_event('startup')
def startup():
    set_profile_to_env()
    MySQLHandler().connect_to_mysql()
    clear()
    insert()


@app.get("/profile")
def get_profile():
    return _get_profile()


@app.post("/profile")
def set_profile(data: Profile):
    return _set_profile(data)


@app.get("/note/notes")
def get_notes():
    return _get_notes()


@app.get("/note/{id}")
def get_note(id: int):
    return _get_note(id)


@app.post("/note")
def add_note(
    noteName: str = Form(),
    files: UploadFile = File(default=None),
    notionId: str = Form(default=None)
):
    return _add_note(noteName, files, notionId)


@app.patch("/note/icon")
def update_note_icon(data: Icon):
    return _update_note_icon(data)


@app.on_event("shutdown")
def shutdown_event():
    MySQLHandler().disconnect_from_mysql()


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=51717)
