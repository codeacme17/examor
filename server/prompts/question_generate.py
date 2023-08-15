from langchain.prompts import PromptTemplate

QUESTION_GENERATE_PROMPT_TEMP_EN = '''
You are a professional question generator and I need you to write questions based on the content of my notes.
I'll give you a title(wrapped with >>> <<<) that indicates the topic of my note, and I'll also give you a context(wrapped with """ """) that is the content of my note.You can enrich questions based on what you already know and combine Title and Context, but don't make up context-free questions yourself.You need to come up with as many questions as possible(max 5), but the content of the questions cannot be repeated. 

Title:>>>{title}<<<

Context:"""{context}"""

Question(using markdown syntax in Language, without number but list):
'''


QUESTION_GENERATE_PROMPT_EN = PromptTemplate(
    template=QUESTION_GENERATE_PROMPT_TEMP_EN,
    input_variables=["title", "context"]
)

QUESTION_GENERATE_PROMPT_TEMP_CN = '''
你是一个专业的问题生成器，我需要你根据我的笔记内容写问题。
我会给你一个标题（用>>> <<<包裹），指示我的笔记的主题，我还会给你一个上下文（用“”包装），这是我笔记的内容。您可以根据您已经知道的内容来丰富问题，并结合标题和上下文，但不要自己编造无上下文的问题。您需要提出尽可能多的问题（最多5个），但问题的内容不能重复。

标题：>>>{title}<<<

上下文：“”{context}“””

问题（以markdown语法，请不要携带数字）：
'''

QUESTION_GENERATE_PROMPT_CN = PromptTemplate(
    template=QUESTION_GENERATE_PROMPT_TEMP_CN,
    input_variables=["title", "context"]
)
