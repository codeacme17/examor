import os
import requests


def fetch_chat_openai(
    prompt: str,
    max_token: int
):
    key = os.getenv("OPENAI_API_KEY")
    organization = os.getenv("OPENAI_ORGANIZATION")
    base = "https://api.openai.com/v1/chat/completions" if os.getenv(
        "OPENAI_BASE") == None else os.getenv("OPENAI_BASE")
    proxy = os.getenv("OPENAI_API_PROXY")

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


def fetch_chat_azure(
    prompt: str,
    max_token: int
):
    key = os.getenv("AZURE_KEY")
    base = os.getenv('AZURE_BASE')
    deployment_name = os.getenv("DEPLOYMENT_NAME")
    version = os.getenv("openaiVersion")

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
