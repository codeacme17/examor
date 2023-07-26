import os
import shutil

from fastapi import UploadFile, File
from langchain.text_splitter import RecursiveCharacterTextSplitter
from utils.MySQLHandler import MySQLHandler
from utils.tools import CustomError

TEMP_PATH = os.path.join(os.getcwd(), "temp")


def upload_file(noteId: int, files: list[UploadFile], folderName):
    TARGET_FOLDER_PATH = os.path.join(TEMP_PATH, folderName)

    if not os.path.exists(TARGET_FOLDER_PATH):
        os.makedirs(TARGET_FOLDER_PATH)

    for file in files:
        filename = file.filename
        save_path = os.path.join(TARGET_FOLDER_PATH, filename)

        with open(save_path, 'wb') as f:
            shutil.copyfileobj(file.file, f)

        with open(save_path, 'r') as f:
            docs = split_file(f.read())

            for doc in docs:
                save_doc_to_db(noteId, filename, doc.page_content)

    if os.path.exists(TARGET_FOLDER_PATH):
        shutil.rmtree(TARGET_FOLDER_PATH)


def split_file(content):
    md_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1300,
        chunk_overlap=0,
        separators=[
            "\n#{1,3} ",
            "\n\*\*\*+\n",
            "\n___+\n",
        ]
    )
    docs = md_splitter.create_documents([content])
    return docs


def save_doc_to_db(noteId, filename, doc):
    insert_query = "INSERT INTO t_document (note_id, file_name, document) VALUES (%s, %s, %s)"
    query_data = (
        noteId,
        filename,
        doc,
    )
    MySQLHandler().insert_table_data(
        insert_query,
        query_data
    )
