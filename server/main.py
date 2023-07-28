from fastapi import FastAPI, File, Form, UploadFile
from typings.profile_types import Profile
from typings.note_types import Icon

from utils.MySQLHandler import MySQLHandler
from utils.profile_handler import set_profile_to_env
from apis import profile, note, document

app = FastAPI()


@app.on_event('startup')
def startup():
    set_profile_to_env()
    MySQLHandler().connect_to_mysql()


# Profile APIs
@app.get("/profile")
def get_profile():
    return profile._get_profile()


@app.put("/profile")
def set_profile(data: Profile):
    return profile._set_profile(data)


# Note APIs
@app.get("/note/notes")
def get_notes():
    return note._get_notes()


@app.get("/note/{id}")
def get_note(id: int):
    return note._get_note(id)


@app.post("/note")
async def add_note(
    language: str = Form(),
    noteName: str = Form(),
    files: list[UploadFile] = File(default=None),
    notionId: str = Form(default=None),
):
    res = await note._add_note(language, noteName, files, notionId)
    return res


@app.delete("/note")
def delete_note(id: int):
    return note._delete_note(id)


@app.patch("/note/icon")
def update_note_icon(data: Icon):
    return note._update_note_icon(data)


# File APIs
@app.get("/files")
def get_files_by_noteId(id: int):
    return document._get_files_by_noteId(id)


@app.delete("/file")
def delete_file(id: int, file_name: str):
    return document._delete_file(id, file_name)


@app.on_event("shutdown")
def shutdown_event():
    MySQLHandler().disconnect_from_mysql()


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=51717)
