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

PROMPT_TEMPLATE = '''
### title ###
{title}

### context ###
{context}

You need to ask as many questions as possible (up to 7), and the questions you generate should cover various knowledge points in context, but all questions must not have any repetitive content.

Problem (in markdown syntax, list without numbers):
'''


def _get_role():
    current_role = os.environ.get("CURRENT_ROLE")
    if current_role == "examiner":
        return examiner
    elif current_role == "teacher":
        return teacher
    elif current_role == "interviewer":
        return interviewer
    else:
        return examiner


QUESTION_GENERATE_PROMPT_EN = PromptTemplate(
    template=_get_role() + PROMPT_TEMPLATE,
    input_variables=["title", "context"]
)
