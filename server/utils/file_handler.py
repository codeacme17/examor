import os

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
    collection = []

    for file in files:
        file_dict = {}
        file_dict["id"] = _dbs_.file.add_file_to_db(noteId, file.filename)
        file_dict["name"] = file.filename
        file_dict["content"] = await file.read()
        collection.append(file_dict)

    for item in collection:
        filename = item["name"]
        file_id = item["id"]
        file_content = item["content"]
        # save file to the temp dir
        not os.path.isdir(f"./temp") and os.mkdir("./temp")
        with open(f"./temp/{filename}", "w+", encoding="utf-8") as f:
            f.write(file_content.decode('utf-8'))
        docs = split_doc(filename)
        # remove temp file
        os.remove(f"./temp/{filename}")

        # Create a LangChain service instance
        langchain_service = _llms_.Chain(
            note_id=noteId,
            file_id=file_id,
            filename=filename,
            prompt_language=language,
            prompt_type="question_generate"
        )

        # Generate questions using LangChain service
        question_count = await langchain_service.agenerate_questions(
            docs,
            noteName,
            questionType,
        )

        # Set the file's uploading state
        _dbs_.file.set_file_is_uploading_state(file_id, question_count)
        print(f">>>>>>>>> {filename} upload success  <<<<<<<<<")
