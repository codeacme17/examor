import json

from typings.config import ApiKeys
from utils.config_handler import set_key_to_env, get_key_from_file


def _config_api_keys(data: ApiKeys):
    FILE_PATH = "configuration.json"

    with open(FILE_PATH, "w") as file:
        json.dump({
            'openaiKey': data.openaiKey,
            'azureKey': data.azureKey,
            'azureVersion': data.azureVersion,
            'azureEndpoint': data.azureEndpoint,
            'pineconeKey': data.pineconeKey,
            'notionKey': data.notionKey,
        }, file)

    set_key_to_env()
    return {"message": "success"}


def _get_api_keys():
    return get_key_from_file()
