import os

from .markdown import MarkdownLoader


def split_doc(filename):
    extension = os.path.splitext(filename)[1]
    loader = _choose_loader(extension)

    with open(f"./temp/{filename}", "r", encoding="utf-8") as f:
        doc_content = f.read()
    docs = loader.split_doc(doc_content)
    return docs


def _choose_loader(extension: str):
    if (extension == ".md"):
        return MarkdownLoader()

    raise f"File of type '{extension}' are not currently supported"


__all__ = [
    "split_doc"
]
