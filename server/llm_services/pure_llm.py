import os
import requests


def check_llm_api_state():
    """Check the status of the LLM API and distinguish payment types."""
    response = _request_llm("hi", 1)
    data = response.json()
    headers = response.headers

    if response.status_code != 200 and data["error"]:
        error_message = data["error"]["message"]
        raise Exception(f"Error: {error_message}")

    return _differentiate_payment_types(headers)


def _request_llm(
    prompt: str,
    max_token: int
):
    """Depending on the current model (OpenAI or Azure), send the request."""
    current_model = os.getenv("CURRENT_MODEL")

    if (current_model == "OpenAI"):
        response = _request_chat_openai(prompt, max_token)
    elif (current_model == "Azure"):
        response = _request_chat_azure(prompt, max_token)
    else:
        raise ValueError("Unsupported model")

    return response


def _request_chat_openai(
    prompt: str,
    max_token: int
):
    """Make a request to the OpenAI API."""
    key = os.getenv("OPENAI_API_KEY")
    organization = os.getenv("OPENAI_ORGANIZATION")
    base = os.environ.get("OPENAI_BASE", "https://api.openai.com")
    proxy = {
        "https": os.environ.get("OPENAI_API_PROXY", ""),
        "http": os.environ.get("OPENAI_API_PROXY", "")
    }
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
        proxies=proxy,
        timeout=3000
    )


def _request_chat_azure(
    prompt: str,
    max_token: int
):
    """Make a request to the Azure API."""
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
        json=data,
        timeout=3000
    )


def _differentiate_payment_types(headers):
    """
    This function differentiates payment types based on rate limit requests.
    More information about rate limits can be found at:
    https://platform.openai.com/docs/guides/rate-limits/overview
    """
    current_model = os.getenv("CURRENT_MODEL")

    if current_model == "Azure":
        os.environ["PAYMENT"] = "paid"
    elif current_model == "OpenAI":
        if headers["x-ratelimit-limit-requests"] == "3":
            os.environ["PAYMENT"] = "free"
        else:
            os.environ["PAYMENT"] = "paid"

    return os.environ["PAYMENT"]
