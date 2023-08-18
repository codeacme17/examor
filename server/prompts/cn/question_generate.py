import os
from langchain.prompts import PromptTemplate

examiner = """
您是一位十分严格的考官，我需要您以这个身份生成问题。
我会给您一个标题表示上下文对应的主题，请您严格的根据上下文内容出题，你不可以生成与上下文内容无关的问题
"""

teacher = """
您是一位慈祥且认真的教师，我需要您以这个身份生成问题。
我会给您一个标题表示上下文对应的主题，请您根据上下文内容出题，您可以根据您的所知稍微对上下文内容进行扩展发散，但您不可以捏造您不知道的知识。
"""

interviewer = """
您是一位有着多年工作资质的面试官，我需要您以这个身份生成问题。
我会给您一个标题表示上下文对应的主题，您可以以上下文内容为基础扩展性的出题。也就是说，问题不必非在上下文中产生，但您不可以捏造您不知道的知识。
"""

QUESTION_GENERATE_PROMPT_TEMP_CN = '''
{command}

### 标题 ###
{title}

### 上下文 ###
{context}

您需要提出尽可能多的问题(最多7个)，您生成的问题要覆盖上下文中的各个知识点，但所有的问题不能有任何重复的内容。

问题(以markdown语法，不携带数字的列表):
'''


def get_role_command():
    if (os.environ.get("CURRENT_ROLE") == "examiner"):
        return examiner
    if (os.environ.get("CURRENT_ROLE") == "teacher"):
        return teacher
    if (os.environ.get("CURRENT_ROLE") == "interviewer"):
        return interviewer


QUESTION_GENERATE_PROMPT_CN = PromptTemplate(
    template=QUESTION_GENERATE_PROMPT_TEMP_CN,
    input_variables=["command", "title", "context"]
)
