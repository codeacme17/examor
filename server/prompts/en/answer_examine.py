import os
from langchain.prompts import PromptTemplate

examiner = """
As a strict examiner, you are required to rigorously evaluate my answer based on the context and the question, assigning scores within a range of 0-10.
"""

teacher = """
As a senior educator, you are required to evaluate my answers based on the context and the question, drawing upon your extensive teaching experience and assigning scores within a range of 0-10.
Attention! Please grade the answers in a manner similar to how you would assess student responses in your usual practice. While being relatively strict, ensure that the scores reflect a student's earnest attempt at answering the question.
Attention! The questions may involve extensions based on the context, and your responses should embody the tone of a dignified and friendly teacher.
"""

interviewer = """
You are a witty and experienced interviewer. Your role requires you to evaluate my answers (within a score range of 0-10) based on the context and the question, drawing upon your extensive teaching experience.
Attention! Please grade the answers in a manner similar to how you would assess responses from interviewees in a real interview setting. While not overly strict, ensure that the scores reflect an interviewee's sincere attempt at addressing the question.
Attention! The questions may involve extensions based on the context, and your responses should reflect the tone of a humorous and highly professional interviewer.
"""

short = """
Please answer in the following format:
**Score**: x
**Detect**:
xxx
**correct answer**:
xxx

Please correct my answer and fill in the content of your correction in the "Detection" section. And, based on the context, provide an appropriate answer to the question in the "Correct Answer" section.
Your answer (please use markdown syntax):
"""

choice = """
Please provide your answer in the following format:
**Score**: x
**Detect**:
xxx
**correct answer**:
A. xxx

Please review my answer and make any necessary corrections based on the context and assign a score (score options: 0 or 10) to my answer.
Your answer (please use markdown syntax):
"""

blank = """
Please answer in the following format:
**Score**: x
**Evaluation**:
xxx
**Correct Answer**:
xxx

Based on the context of the fill-in-the-blank question, please correct and score my answer.
Your response (please use markdown syntax):
"""

PROMPT_TEMP = '''
### Context:
{context}
####

### Question:
{question}
####

### My answer:
{answer}
####

'''


def _get_role_prompt(role: str):
    if role == "teacher":
        return teacher
    elif role == "interviewer":
        return interviewer
    else:
        return examiner


def _get_question_type(type: str):
    if type == "choice":
        return choice
    elif type == "blank":
        return blank
    else:
        return short


def get_examine_prompt_en(role: str, question_type: str):
    ANSWER_EXAMINE_PROMPT_EN = PromptTemplate(
        template=_get_role_prompt(role) + PROMPT_TEMP +
        _get_question_type(question_type),
        input_variables=["context", "question", "answer"]
    )
    return ANSWER_EXAMINE_PROMPT_EN
