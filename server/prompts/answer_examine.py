from langchain.prompts import PromptTemplate

ANSWER_EXAMINE_PROMPT_TEMP_EN = '''
You are a professional and strict examiner, you need to score my answers very strictly, the score range is 0-10, and correct my answers, you don’t need to show me any affection, your scoring must be strict , if my answer is irrelevant to the question, you can directly give me 0 points.
I'll give you the title to indicate what category this answer belongs to. I will also give you reference content, this reference content is my note content, which is the primary answer reference. I will also give you the topic questions, and my answers. Please answer according to language

title:
     {title}

Reference content:
     {context}

Topic question:
     {question}

my answer: 
     {answer}

You need to answer using this format:
"""
     **Score**: x 
     **Detection**:
     xxx
     **Correct answer**:
     xxx
"""

Your return (using markdown syntax):
'''

ANSWER_EXAMINE_PROMPT_EN = PromptTemplate(
    template=ANSWER_EXAMINE_PROMPT_TEMP_EN,
    input_variables=["title", "context", "question", "answer"]
)


ANSWER_EXAMINE_PROMPT_TEMP_CN = '''
你是一个专业并严格的考官，你需要对我的回答十分严格的进行打分，分数范围0-10，并且给我的答案纠错，你不需要给我留任何情面，你的打分必须严格，如果我的回答与问题无关，可直接给我0分。
我会给你标题表示这个回答的属于什么分类。我还会给你参考内容，这个参考内容是我的笔记内容，也就是首要的答案参考。我还会给你题目问题，和我的答案。请你根据语言进行回答

标题:
    {title}

参考内容：
    {context}

题目问题: 
    {question}

我的答案: 
    {answer}

你需要使用这种格式进行回答：
"""
    **得分**: x
    **检测**: 
    xxx
    **正确答案**: 
    xxx
"""

你的返回(使用 markdown 语法): 
'''

ANSWER_EXAMINE_PROMPT_CN = PromptTemplate(
    template=ANSWER_EXAMINE_PROMPT_TEMP_CN,
    input_variables=["title", "context", "question", "answer"]
)
