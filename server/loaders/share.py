import tiktoken

MAX_TOKEN = 2700


def len_token(s: str):
    enc = tiktoken.get_encoding("cl100k_base")
    return len(enc.encode(s))


def is_odd_backtick_paired(s: str) -> bool:
    """
    Check if the string contains paired odd backticks (` ``` `).

    Parameters:
    - s (str): The string to check.

    Returns:
    - bool: True if the triple backticks in the string are paired, False otherwise.
    """
    counts = s.count('```')
    if counts == 0:
        return False
    elif counts % 2 == 0:
        return False
    return True


def is_there_no_enough_content(s: str) -> bool:
    """
    Check if the string has less than 200 tokens.
    Paragraphs that are too short will prevent useful knowledge points from being extracted.

    Parameters:
    - s (str): The string to check.

    Returns:
    - bool: True if the string has less than 200 tokens, False otherwise.
    """
    return bool(len_token(s) < 200)


def is_the_token_exceeded(s: str) -> bool:
    """
    Check if the string exceeds MAX_TOKEN tokens.

    Parameters:
    - s (str): The string to check.

    Returns:
    - bool: True if the string exceeds MAX_TOKEN tokens, False otherwise.
    """
    return bool(len_token(s) > MAX_TOKEN)
