import os
import db_services as _dbs_

from fastapi import File, Form, UploadFile

from utils import api_result, types, upload_file


# Get notes list
def get_notes():
    res = _dbs_.note.get_all_notes()
    return api_result.success(res)


# Get note info
def get_note(id: int):
    res = _dbs_.note.get_note_by_id(id)
    return api_result.success(res)


# Get file list by note id
def get_files_by_id(id: int):
    res = _dbs_.note.get_all_files_by_id(id)
    return api_result.success(res)


# Get question list by note id
def get_questions_by_note_id(note_id: int):
    LIMIT_QUESTIONS = int(os.environ["QUESTION_AMOUNT"])

    expired_questions = _dbs_.question.get_expired_questions(note_id)
    gap = 0 if LIMIT_QUESTIONS - \
        len(expired_questions) < 0 else LIMIT_QUESTIONS - len(expired_questions)

    today_questions = _dbs_.question.get_today_questions(note_id, gap)
    gap = 0 if gap - \
        len(today_questions) < 0 else gap - len(today_questions)

    supplement_questions = _dbs_.question.get_supplement_questions(
        note_id,
        gap
    )

    return api_result.success({
        "expired": expired_questions,
        "today":  today_questions,
        "supplement": supplement_questions
    })


# Add new note
async def add_note(
    language: str,
    questionType: str,
    noteName: str = Form(),
    files: list[UploadFile] = File(default=None),
    notionId: str = Form(default=None),
):
    if (_dbs_.note.is_duplicate(noteName)):
        return api_result.error("The same note name cannot be created repeatedly")

    if (len(files) > 3):
        return api_result.error("It is not possible to upload more than three files at one time")

    if (len(files) > 0):
        try:
            await upload_file(
                language=language,
                questionType=questionType,
                noteId=_dbs_.note.get_inserted_note_id(noteName),
                noteName=noteName,
                files=files
            )
        except Exception as e:
            return api_result.error(str(e))

    # TODO notion databse
    if (notionId is not None):
        pass

    return api_result.success("Note added successfully")


# Add new files to note
async def add_file(
    language: str = Form(),
    noteId: int = Form(),
    noteName: str = Form(),
    files: list[UploadFile] = File(default=None),
    notionId: str = Form(default=None)
):
    for file in files:
        if (_dbs_.file.is_duplicate(noteId, file.filename)):
            return api_result.error("The same file cannot be uploaded under one note")

    if (len(files) > 3):
        return api_result.error("It is not possible to upload more than three files at one time")

    if (len(files) > 0):
        try:
            await upload_file(language, noteId, noteName, files)
        except Exception as e:
            return api_result.error(str(e))

    if (notionId is not None):
        pass

    return api_result.success("Files added successfully")


# Delete note by note id
def delete_note(id: int):
    _dbs_.note.delete_note(id)
    return api_result.success("Note deleted successfully")


# Update note icon
def update_note_icon(data: types.Icon):
    _dbs_.note.update_icon(data)
    return api_result.success("Icon updated successfully")
