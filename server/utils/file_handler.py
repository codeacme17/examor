from fastapi import UploadFile

import db_services as _dbs_

from lang_chain.chain import Chain
from loaders import split_doc


async def upload_file(
    language: str,
    questionType: str,
    noteId: int,
    noteName: str,
    files: list[UploadFile],
):
    for file in files:
        filename = file.filename
        file_type = file.content_type
        file_id = _dbs_.file.add_file_to_db(noteId, filename)
        file_content = await file.read()
        docs = split_doc(file_type, file_content.decode('utf-8'))

        langchain_service = Chain(
            note_id=noteId,
            file_id=file_id,
            filename=filename,
            prompt_language=language,
            prompt_type="question_generate"
        )

        await langchain_service.agenerate_questions(
            docs,
            noteName,
            questionType,
        )

        _dbs_.file.set_file_is_uploading_state(file_id)
        print(f">>>>>>>>> {filename} upload success  <<<<<<<<<")
