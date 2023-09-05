import os
import requests


def check_llm_api_state():
    response = None
    current_model = os.getenv("CURRENT_MODEL")
    if (current_model == "OpenAI"):
        response = _fetch_chat_openai("hi", 1)
    if (current_model == "Azure"):
        response = _fetch_chat_azure("hi", 1)

    data = response.json()
    headers = response.headers

    if response.status_code != 200 and data["error"]:
        error_message = data["error"]["message"]
        raise Exception(f"Error: {error_message}")


def _fetch_chat_openai(
    prompt: str,
    max_token: int
):
    key = os.getenv("OPENAI_API_KEY")
    organization = os.getenv("OPENAI_ORGANIZATION")
    base = "https://api.openai.com" if not os.getenv(
        "OPENAI_BASE") else os.getenv("OPENAI_BASE")
    proxy = {
        "https": os.getenv("OPENAI_API_PROXY") if os.getenv("OPENAI_API_PROXY") else ""
    }
    print(base)
    headers = {
        "Authorization": f"Bearer {key}",
        "OpenAI-Organization": organization,
        "Content-Type": "application/json"
    }
    data = {
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "system", "content": prompt}],
        "max_tokens": max_token
    }
    return requests.post(
        f"{base}/v1/chat/completions",
        headers=headers,
        json=data,
        proxies=proxy
    )


def _fetch_chat_azure(
    prompt: str,
    max_token: int
):
    key = os.getenv("AZURE_KEY")
    base = os.getenv('AZURE_BASE')
    deployment_name = os.getenv("DEPLOYMENT_NAME")
    version = os.getenv("OPENAI_VERSION")

    headers = {
        "api-key": key,
        "Content-Type": "application/json",
    }
    data = {
        "prompt": prompt,
        "max_tokens": max_token
    }
    return requests.post(
        f"{base}/openai/deployments/{deployment_name}/completions?api-version={version}",
        headers=headers,
        json=data
    )
