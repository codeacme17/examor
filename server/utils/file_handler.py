import os
import shutil
import pprint

from fastapi import UploadFile, File
from langchain.text_splitter import RecursiveCharacterTextSplitter


TEMP_PATH = os.path.join(os.getcwd(), "temp")


def save_files(files: list[UploadFile], folderName):
    TARGET_FOLDER_PATH = os.path.join(TEMP_PATH, folderName)

    if not os.path.exists(TARGET_FOLDER_PATH):
        os.makedirs(TARGET_FOLDER_PATH)

    for file in files:
        filename = file.filename
        save_path = os.path.join(TARGET_FOLDER_PATH, filename)

        with open(save_path, 'wb') as f:
            shutil.copyfileobj(file.file, f)

        with open(save_path, 'r') as f:
            split_file(f.read())


def split_file(content):
    md_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1300,
        chunk_overlap=0,
        separators=[
            # First, try to split along Markdown headings (starting with level 2)
            "\n#{1,6} ",
            # Note the alternative syntax for headings (below) is not handled here
            # Heading level 2
            # ---------------
            # End of code block
            "```\n",
            # Horizontal lines
            "\n\*\*\*+\n",
            "\n---+\n",
            "\n___+\n",
            # Note that this splitter doesn't handle horizontal lines defined
            # by *three or more* of ***, ---, or ___, but this is not handled
            "\n\n",
            "\n",
            " ",
            "",
        ]

    )
    docs = md_splitter.create_documents([content])

    for doc in docs:
        print("\n\n===============================\n")
        print(doc)
