import re
from langchain.schema import Document
from langchain.text_splitter import RecursiveCharacterTextSplitter


class MarkdownLoader:
    def __init__(self) -> None:
        pass

    def load_file(file):
        pass

    def split_doc(self, doc_content) -> list[Document]:
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1300,
            chunk_overlap=0,
            separators=[
                "\n#{1,6} ",
                "\n\*\*\*+\n",
                "\n___+\n",
            ])
        docs = text_splitter.create_documents([doc_content])
        res = []
        for doc in docs:
            if (self._is_header(doc.page_content)):
                continue
            res.append(doc)
        return res

    def _is_header(self, line):
        pattern = r'^#\s.+'
        return bool(re.match(pattern, line))
