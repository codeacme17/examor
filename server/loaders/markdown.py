from langchain.schema import Document
from langchain.text_splitter import RecursiveCharacterTextSplitter
from .share import len_token, MAX_TOKEN, is_the_token_exceeded, is_there_no_enough_content, is_odd_backtick_paired


class MarkdownLoader:
    def __init__(self) -> None:
        pass

    def load_file(file):
        pass

    def split_doc(self, doc_content) -> list[Document]:
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=MAX_TOKEN,
            chunk_overlap=0,
            is_separator_regex=True,
            length_function=len_token,
            separators=[
                # Matches first-level title followed by second, third, or fourth-level title
                "\n#\s[^\n]+\n\n?##+?\s[^\n]+",
                "\n#{1,6}\s",
                # Matches three or more dashes followed by a newline
                "\n-{3,}\n",
                # Matches three or more underscores followed by a newline
                "\n_{3,}\n",
                # Matches unordered list items starting with '-'
                "\n\s*-\s[^\n]+\n",
                # Matches ordered list items
                "\n\s*\d+[.)]\s[^\n]+\n",
                # Matches open code block
                "\n```\w+\n",
            ],
        )

        docs = text_splitter.create_documents([doc_content])
        res: list[Document] = []
        for doc in docs:
            content = doc.page_content
            if is_odd_backtick_paired(content):
                continue
            if is_there_no_enough_content(content):
                continue
            if is_the_token_exceeded(content):
                continue
            res.append(doc)

        return res
