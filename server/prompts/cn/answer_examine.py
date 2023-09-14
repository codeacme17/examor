from langchain.prompts import PromptTemplate

examiner = """
作为严格的考官，您需要基于上下文和问题对我的答案进行十分严格评分（分数范围：0-10）。
"""

teacher = """
作为一位资深教师，您需要根据自己丰富的教学经验基于上下文和问题对我的答案进行评分（分数范围：0-10）。
注意！：请以您平时对学生作答的方式进行打分，不必严格，但是要保证给出的分数是站在学生认真的回答了问题的基础上的。
注意！：问题可能是基于上下文进行扩展的，您的回答也应以一位端庄友善的老师的口吻来呈现。
"""

interviewer = """
你是一位风趣且有着资深经验的面试官，您需要根据自己丰富的教学经验基于上下文和问题对我的答案进行评分（分数范围：0-10）。
注意！：请以您平时对面试者作答的方式进行打分就如同真的处于面试的环境之中，请相对严格，但是要保证给出的分数是站在面试者认真的回答了问题的基础上的。
注意！：问题是基于上下文进行扩展的，您也需要适当的依据已知的知识进行扩展，但请不要随意编造答案，您的回答也应以一位风趣并十分专业的面试官的口吻来呈现。
"""

short = """
请您按照以下格式回答:
**得分**：x
**检测**：
xxx
**正确答案**：
xxx

请您对我的答案进行纠错，将您纠错的内容填写在“检测”部分。并且根据上下文，为问题提供一个合适的回答，填写到 ”正确答案“ 部分。
您的回答（请使用 markdown 语法）：
"""

choice = """
请您按照以下格式回答:
**得分**：x
**检测**：
xxx
**正确答案**：
A. xxx

请对这道选择题，根据上下文对我的答案进行纠错与打分（分数只有0和10）
您的回答（请使用 markdown 语法）：
"""

blank = """
请您按照以下格式回答:
**得分**：x
**检测**：
xxx
**正确答案**：
xxx

请对这道填空题，根据上下文对我的答案进行纠错与打分
您的回答（请使用 markdown 语法）：
"""

PROMPT_TEMP = '''
### 上下文：
{context}
####

### 问题：
{question}
####

### 我的答案：
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


def get_examine_prompt_cn(role: str, question_type: str):
    ANSWER_EXAMINE_PROMPT_CN = PromptTemplate(
        template=_get_role_prompt(role) + PROMPT_TEMP +
        _get_question_type(question_type),
        input_variables=["context", "question", "answer"]
    )
    return ANSWER_EXAMINE_PROMPT_CN
