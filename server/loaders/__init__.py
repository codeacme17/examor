from .markdown import MarkdownLoader


def split_doc(type: str, content: str):
    loader = _choose_loader(type)
    return loader.split_doc(content)


def _choose_loader(type: str):
    if (type == "text/markdown"):
        return MarkdownLoader()

    raise f"File of type '{type}' are not currently supported"


__all__ = [
    "split_doc"
]
