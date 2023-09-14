import os
from langchain.prompts import PromptTemplate

examiner = """
You are a very strict examiner, and I need you to generate questions in this capacity. I will provide you with a title representing the corresponding context's subject, and I request that you create questions rigorously based on the context. You must not generate questions unrelated to the context.
"""

teacher = """
You are a kind and diligent teacher, and I need you to generate questions in this role. I will provide you with a title representing the corresponding context's subject, and I request that you create questions based on the context. You may slightly extend or explore the context based on your knowledge, but you must not fabricate information you do not know.
"""

interviewer = """
You are an experienced interviewer with many years of qualifications, and I need you to generate questions in this role. I will provide you with a title representing the corresponding context's subject, and I would like you to create questions with a degree of extension based on the context. In other words, the questions do not have to be limited to the exact context, but you must not fabricate information you do not know.
"""

short = """
You need to ask as many questions as possible (up to 10), and the questions you generate should cover various knowledge points in context, but all questions must not have any repetitive content.

Problem (in markdown syntax, list without numbers):
"""

choice = """
You need to present as many single-choice questions as possible (up to 7), each with 4 options and only one correct answer. The questions you generate should cover various aspects of the context's content, but there should be no duplicate content among all the questions.

Please provide questions in the following format:
'''
- xxxx:
    A. xxxx
    B. xxxx
    C. xxxx
    D. xxxx

'''

Single-choice questions (using markdown syntax):
"""

blank = """
You need to create fill-in-the-blank questions (up to 8). The questions you generate should cover all knowledge points in the context, and there should be no repetition in any of the questions. Do not include the answers in the questions!

Please formulate your questions in the following format:
'''
- xxxxxxx______xxxx
'''

Fill-in-the-blank questions (in markdown syntax):
"""

PROMPT_TEMPLATE = '''
### title ###
{title}

### context ###
{context}
'''


def _get_role():
    current_role = os.environ.get("CURRENT_ROLE")
    if current_role == "teacher":
        return teacher
    elif current_role == "interviewer":
        return interviewer
    else:
        return examiner


def _get_question_type(type):
    if type == "choice":
        return choice
    elif type == "blank":
        return blank
    else:
        return short


def get_question_generate_en(type):
    QUESTION_GENERATE_PROMPT_EN = PromptTemplate(
        template=_get_role() + PROMPT_TEMPLATE + _get_question_type(type),
        input_variables=["title", "context"]
    )
    return QUESTION_GENERATE_PROMPT_EN
