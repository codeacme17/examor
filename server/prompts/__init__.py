from .answer_examine import ANSWER_EXAMINE_PROMPT_CN, ANSWER_EXAMINE_PROMPT_EN
from .cn.question_generate import QUESTION_GENERATE_PROMPT_CN
from .en.question_generate import QUESTION_GENERATE_PROMPT_EN


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


__all__ = [
    "choose_prompt",
]
