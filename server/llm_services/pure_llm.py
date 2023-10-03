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
    elif (current_model == "Anthropic"):
        response = _request_chat_anthropic(prompt, max_token)
    else:
        raise ValueError("Unsupported model")

    return response


def _request_chat_openai(
    prompt: str,
    max_token: int
):
    """Make a request to the OpenAI API."""
    model = os.getenv("OPENAI_MODEL")
    key = os.getenv("OPENAI_API_KEY")
    organization = os.getenv("OPENAI_ORGANIZATION")
    base = os.getenv("OPENAI_BASE")
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
        "model": model,
        "messages": [{"role": "system", "content": prompt}],
        "max_tokens": max_token
    }
    return requests.post(
        url=f"{base}/v1/chat/completions",
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
    deployment_name = os.getenv("AZURE_DEPLOYMENT_NAME")
    version = os.getenv("AZURE_VERSION")
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


def _request_chat_anthropic(
    prompt: str,
    max_token: int
):
    """Make a request to the Anthropic API."""
    key = os.getenv("ANTHROPIC_KEY")
    version = os.getenv("ANTHROPIC_VERSION")
    model = os.getenv("ANTHROPIC_MODEL")
    headers = {
        "x-api-key": key,
        "Content-Type": "application/json",
        "accept": "application/json",
        "anthropic-version": version,
    }
    data = {
        "prompt": prompt,
        "max_tokens_to_sample": max_token,
        "model": model
    }
    return requests.post(
        "https://api.anthropic.com/v1/complete",
        headers=headers,
        json=data,
        timeout=3000
    )


def _differentiate_payment_types(headers):
    """
    This function differentiates payment types based on rate limit requests.
    More information about rate limits can be found at:
    - Openai: https://platform.openai.com/docs/guides/rate-limits/overview
    - Azure: https://learn.microsoft.com/en-us/azure/ai-services/openai/quotas-limits
    - Anthropic: https://docs.anthropic.com/claude/reference/errors-and-rate-limits#rate-limits
    """
    current_model = os.getenv("CURRENT_MODEL")
    openai_model = os.getenv("OPENAI_MODEL")

    if current_model == "OpenAI":
        if openai_model == "gpt-4":
            os.environ["PAYMENT"] = "paid"
        elif headers["x-ratelimit-limit-requests"] == "200":
            os.environ["PAYMENT"] = "free"
        else:
            os.environ["PAYMENT"] = "paid"

    # Azure is always paid
    if current_model == "Azure":
        os.environ["PAYMENT"] = "paid"

    # Anthropic is always free.
    if current_model == "Anthropic":
        os.environ["PAYMENT"] = "free"

    return os.environ["PAYMENT"]
