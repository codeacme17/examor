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

    expired_questions = _dbs_.question.get_expired_questions(
        note_id, LIMIT_QUESTIONS)
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
    language: str = Form(),
    noteName: str = Form(),
    questionType: str = Form(),
    uploadType: str = Form(),
    files: list[UploadFile] = File(default=None),
    notionId: str = Form(default=None),
):
    # Check for duplicate note names
    if (_dbs_.note.is_duplicate(noteName)):
        return api_result.error("The same note name cannot be created repeatedly")

    # Handle the 'files' upload type
    if uploadType == 'files':
        return await _handle_files_upload(
            language=language,
            noteName=noteName,
            noteId=_dbs_.note.get_inserted_note_id(noteName),
            questionType=questionType,
            files=files
        )

    # Handle the 'notion' upload type
    if uploadType == 'notion':
        return await _handle_notion_upload(notionId)

    return api_result.success("Note added successfully")


# Add new files to note
async def add_file(
    noteId: int = Form(),
    noteName: str = Form(),
    language: str = Form(),
    questionType: str = Form(),
    uploadType: str = Form(),
    files: list[UploadFile] = File(default=None),
    notionId: str = Form(default=None)
):
    # Handle the 'files' upload type
    if uploadType == 'files':
        # Check for duplicate file names in the same note
        for file in files:
            if (_dbs_.file.is_duplicate(noteId, file.filename)):
                return api_result.error(f"The same file {file.filename} cannot be uploaded under one note")

        return await _handle_files_upload(
            language=language,
            noteName=noteName,
            noteId=noteId,
            questionType=questionType,
            files=files
        )

    # TODO notion databse
    if uploadType == 'notion':
        return await _handle_notion_upload(notionId)

    return api_result.success("Files added successfully")


# Delete note by note id
def delete_note(id: int):
    _dbs_.note.delete_note(id)
    return api_result.success("Note deleted successfully")


# Update note icon
def update_note_icon(data: types.Icon):
    _dbs_.note.update_icon(data)
    return api_result.success("Icon updated successfully")


async def _handle_files_upload(language, noteName, noteId, questionType, files):
    # Check if files are uploaded
    if not files:
        return api_result.error("At least one file must be uploaded")

    # Check if more than three files are uploaded at once
    if len(files) > 3:
        return api_result.error("You cannot upload more than three files at once")

    try:
        # Call the upload file function
        await upload_file(
            language=language,
            questionType=questionType,
            noteId=noteId,
            noteName=noteName,
            files=files
        )
        return api_result.success("Files uploaded successfully")
    except Exception as e:
        return api_result.error(str(e))


async def _handle_notion_upload(notionId):
    # TODO: Handle the notion database case here
    if notionId:
        pass
    return api_result.success("Notion upload handled successfully")
