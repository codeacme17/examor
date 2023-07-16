import os
import json

from typings.config import ApiKeys

FILE_PATH = "configuration.json"


def set_key_to_env():
    init_config_file()
    data: ApiKeys = get_key_from_file()

    os.environ['OPENAI_KEY'] = data['openaiKey']
    os.environ['AZURE_KEY'] = data['azureKey']
    os.environ['AZURE_VERSION'] = data['azureVersion']
    os.environ['AZURE_ENDPOINT'] = data['azureEndpoint']
    os.environ['PINECONE_KEY'] = data['pineconeKey']
    os.environ['NOTION_KEY'] = data['notionKey']

    print(os.environ['OPENAI_KEY'])


def init_config_file():
    if os.path.isfile(FILE_PATH):
        return

    with open(FILE_PATH, "w") as file:
        json.dump({
            'openaiKey': "",
            'azureKey': "",
            'azureVersion': "",
            'azureEndpoint': "",
            'pineconeKey': "",
            'notionKey': "",
        }, file)


def get_key_from_file() -> ApiKeys:
    with open(FILE_PATH, "r") as file:
        data: ApiKeys = json.load(file)
    return data


def check_has_key():
    return ""
