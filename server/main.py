from fastapi import FastAPI, File, Form, UploadFile, WebSocket, WebSocketDisconnect
from fastapi.responses import StreamingResponse

import apis as _apis_
import db_services as _dbs_

from utils import types


app = FastAPI()


@app.on_event('startup')
def startup():
    _dbs_.profile.set_profile_to_env()


@app.on_event("shutdown")
def shutdown_event():
    pass


# -------- Profile APIs --------
@app.get("/profile")
def get_profile():
    return _apis_.profile.get_profile()


@app.put("/profile")
def set_profile(data: types.Profile):
    return _apis_.profile.set_profile(data)


@app.get("/profile/auth/llm")
def check_llm_api_state():
    return _apis_.profile.check_llm_api_state()


@app.get("/profile/data")
def get_mysql_data(isProfile: bool, isNotes: bool):
    return _apis_.profile.export_data(isProfile, isNotes)


@app.post("/profile/data")
def set_mysql_data(file: UploadFile = File()):
    return _apis_.profile.import_data(file)


# -------- Note APIs --------
@app.get("/note/notes")
def get_notes():
    return _apis_.note.get_notes()


@app.post("/note")
async def add_note(
    language: str = Form(),
    noteName: str = Form(),
    questionType: str = Form(),
    uploadType: str = Form(),
    files: list[UploadFile] = File(default=None),
    notionId: str = Form(default=None),
):
    return await _apis_.note.add_note(
        language=language,
        noteName=noteName,
        questionType=questionType,
        uploadType=uploadType,
        files=files,
        notionId=notionId
    )


@app.get("/note/{id}")
def get_note(id: int):
    return _apis_.note.get_note(id)


@app.get("/note/{id}/files")
def get_files_by_id(id: int):
    return _apis_.note.get_files_by_id(id)


@app.post("/note/{id}/file")
async def add_files_to_note(
    id: int,
    language: str = Form(),
    noteName: str = Form(),
    questionType: str = Form(),
    uploadType: str = Form(),
    files: list[UploadFile] = File(default=None),
    notionId: str = Form(default=None)
):
    return await _apis_.note.add_file(
        noteId=id,
        language=language,
        noteName=noteName,
        questionType=questionType,
        uploadType=uploadType,
        files=files,
        notionId=notionId
    )


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
def delete_file(id: int):
    return _apis_.file.delete_file(id)


@app.get("/file/{id}/questionCount")
def get_quesiton_count(id: int):
    return _apis_.file.get_question_count(id)


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


# -------- Question Bank APIs --------
@app.get("/bank/{language}/categories")
def get_categories(language: str):
    return _apis_.bank.get_categories(language)


@app.get("/bank/{language}/{category}")
def get_banks(language: str, category: str):
    return _apis_.bank.get_banks(language, category)


@app.post("/bank/import")
def import_bank_to_note(data: types.ImportBankData):
    return _apis_.bank.import_bank_to_note(data)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=51717)
