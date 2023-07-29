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

问题（在语言中使用降价语法，没有数字但列表）：
'''

QUESTION_GENERATE_PROMPT_CN = PromptTemplate(
    template=QUESTION_GENERATE_PROMPT_TEMP_CN,
    input_variables=["title", "context"]
)


ANSWER_EXAMINE_PROMPT_TEMP_EN = '''
You are a professional and strict examiner, you need to score my answers very strictly, the score range is 0-10, and correct my answers, you don’t need to show me any affection, your scoring must be strict , if my answer is irrelevant to the question, you can directly give me 0 points.
I'll give you the title to indicate what category this answer belongs to. I will also give you reference content, this reference content is my note content, which is the primary answer reference. I will also give you the topic questions, and my answers. Please answer according to language

title:
     {title}

Reference content:
     {context}

Topic question:
     {quesiton}

my answer: 
     {answer}

You need to answer using this format:
     **Score** 
     /n/n x 
     **Detection**
     /n/n xxx
     **Correct answer**
     /n/n xxx

Your return (using markdown syntax):
'''

ANSWER_EXAMINE_PROMPT_EN = PromptTemplate(
    template=ANSWER_EXAMINE_PROMPT_TEMP_EN,
    input_variables=["title", "context", "quesiton", "answer"]
)


ANSWER_EXAMINE_PROMPT_TEMP_CN = '''
你是一个专业并严格的考官，你需要对我的回答十分严格的进行打分，分数范围0-10，并且给我的答案纠错，你不需要给我留任何情面，你的打分必须严格，如果我的回答与问题无关，可直接给我0分。
我会给你标题表示这个回答的属于什么分类。我还会给你参考内容，这个参考内容是我的笔记内容，也就是首要的答案参考。我还会给你题目问题，和我的答案。请你根据语言进行回答

标题:
    {title}

参考内容：
    {context}

题目问题: 
    {quesiton}

我的答案: 
    {answer}

你需要使用这种格式进行回答：
    **得分**: x
    
    **检测**: xxx
    
    **正确答案**: xxx


你的返回(使用 markdown 语法): 
'''

ANSWER_EXAMINE_PROMPT_CN = PromptTemplate(
    template=ANSWER_EXAMINE_PROMPT_TEMP_CN,
    input_variables=["title", "context", "quesiton", "answer"]
)


def choose_prompt(
    prompt_language: str,
    prompt_type: str,
):
    prompt = None

    if (prompt_language == "en"):
        if (prompt_type == "question_generate"):
            prompt = QUESTION_GENERATE_PROMPT_EN
        if (prompt_type == "answer_examine"):
            prompt = ANSWER_EXAMINE_PROMPT_EN

    if (prompt_language == "zh-CN"):
        if (prompt_type == "question_generate"):
            prompt = QUESTION_GENERATE_PROMPT_CN
        if (prompt_type == "answer_examine"):
            prompt = ANSWER_EXAMINE_PROMPT_CN

    return prompt
