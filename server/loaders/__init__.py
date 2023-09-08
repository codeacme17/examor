import os

from .markdown import MarkdownLoader


def split_doc(filename):
    extension = os.path.splitext(filename)[1]
    loader = _choose_loader(extension)
    docs = loader.split_doc(filename)
    os.remove(f"./{filename}")
    return docs


def _choose_loader(extension: str):
    if (extension == ".md"):
        return MarkdownLoader()

    raise f"File of type '{type}' are not currently supported"


__all__ = [
    "split_doc"
]
