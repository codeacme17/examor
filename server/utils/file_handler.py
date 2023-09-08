from fastapi import UploadFile

import db_services as _dbs_
import llm_services as _llms_

from loaders import split_doc


async def upload_file(
    language: str,
    questionType: str,
    noteId: int,
    noteName: str,
    files: list[UploadFile],
):
    """
    Uploads multiple files and generates questions based on their content.

    :param language: The language for generating questions.
    :param noteId: The ID of the note to associate with the files.
    :param noteName: The name of the note.
    :param files: A list of UploadFile objects representing the files to upload.
    :return: None
    """

    for file in files:
        filename = file.filename
        # Add the file to the database and get its ID
        file_id = _dbs_.file.add_file_to_db(noteId, filename)
        # Read the file content
        file_content = await file.read()
        with open(f"./{filename}", "w+", encoding="utf-8") as f:
            f.write(file_content.decode('utf-8'))
        # Split the file content into documents
        docs = split_doc(filename)

        # Create a LangChain service instance
        langchain_service = _llms_.Chain(
            note_id=noteId,
            file_id=file_id,
            filename=filename,
            prompt_language=language,
            prompt_type="question_generate"
        )

        # Generate questions using LangChain service
        await langchain_service.agenerate_questions(
            docs,
            noteName,
            questionType,
        )

        # Set the file's uploading state
        _dbs_.file.set_file_is_uploading_state(file_id)
        print(f">>>>>>>>> {filename} upload success  <<<<<<<<<")
