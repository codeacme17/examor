import json

from typings.config import ApiKeys
from utils.key_handler import set_key_to_env, get_key_from_file


def _config_api_keys(data: ApiKeys):
    FILE_PATH = "configuration.json"

    with open(FILE_PATH, "w") as file:
        json.dump({
            'OPENAI_KEY': data.openai_key,
            'AZURE_KEY': data.azure_key,
            'AZURE_VERSION': data.azure_version,
            'AZURE_ENDPOINT': data.azure_endpoint,
            'PINECONE_KEY': data.pinecone_key,
            'NOTION_KEY': data.notion_key
        }, file)

    set_key_to_env()
    return {"message": "success"}


def _get_api_keys():
    return get_key_from_file()
