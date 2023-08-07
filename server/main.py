import apis as _apis_

from fastapi import FastAPI, File, Form, UploadFile, WebSocket, WebSocketDisconnect
from fastapi.responses import StreamingResponse

from utils import types
from utils.profile_handler import set_profile_to_env
from db_services.MySQLHandler import MySQLHandler

app = FastAPI()


@app.on_event('startup')
def startup():
    set_profile_to_env()
    MySQLHandler().connect_to_mysql()


@app.on_event("shutdown")
def shutdown_event():
    MySQLHandler().disconnect_from_mysql()


# -------- Profile APIs --------
@app.get("/profile")
def get_profile():
    return _apis_.profile.get_profile()


@app.put("/profile")
def set_profile(data: types.Profile):
    return _apis_.profile.set_profile(data)


# -------- Note APIs --------
@app.get("/note/notes")
def get_notes():
    return _apis_.note.get_notes()


@app.post("/note")
async def add_note(
    language: str = Form(),
    noteName: str = Form(),
    files: list[UploadFile] = File(default=None),
    notionId: str = Form(default=None),
):
    return await _apis_.note.add_note(language, noteName, files, notionId)


@app.get("/note/{id}")
def get_note(id: int):
    return _apis_.note.get_note(id)


@app.get("/note/{id}/files")
def get_files_by_noteId(id: int):
    return _apis_.note.get_files_by_noteId(id)


@app.post("/note/{id}/file")
async def add_files_to_note(
    language: str = Form(),
    noteId: int = Form(),
    noteName: str = Form(),
    files: list[UploadFile] = File(default=None),
    notionId: str = Form(default=None)
):
    print(language, noteId, noteName, files, notionId)
    return await _apis_.note.add_file(language, noteId, noteName, files, notionId)


@app.get("/note/{id}/questions")
def get_questions_by_note_id(id: int):
    return _apis_.note.get_questions_by_note_id(id)


@app.delete("/note/{id}")
def delete_note(id: int):
    return _apis_.note.delete_note(id)


@app.patch("/note/icon")
def update_note_icon(data: types.Icon):
    return _apis_.note.update_note_icon(data)


# -------- File APIs --------
@app.delete("/file")
def delete_file(id: int, file_name: str):
    return _apis_.file.delete_file(id, file_name)


@app.websocket("/ws/file/uploading")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            await websocket.receive_text()
            uploading_files = {"data": _apis_.file.get_uploading_files()}
            await websocket.send_json(uploading_files)
    except WebSocketDisconnect:
        pass


# -------- Question APIs --------
@app.post("/question/examine")
async def examine_question(data: types.AnswerQuestion):
    return StreamingResponse(
        _apis_.question.examine_question(data),
        media_type="text/event-stream"
    )


@app.get("/question/{id}/lastAnswer")
def get_last_answer(id: int):
    return _apis_.question.get_last_answer(id)


@app.get("/question/{id}/document")
def get_document(id: int):
    return _apis_.question.get_document(id)


@app.get("/question/random")
def get_random_question():
    return _apis_.question.get_random_question()


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=51717)
