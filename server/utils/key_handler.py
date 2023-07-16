import os
import json

from typings.config import ApiKeys

FILE_PATH = "configuration.json"


def get_key_from_file() -> ApiKeys:
    with open(FILE_PATH, "r") as file:
        data: ApiKeys = json.load(file)
    return data


def set_key_to_env():
    FILE_PATH = "configuration.json"
    data: ApiKeys = get_key_from_file()

    os.environ['OPENAI_KEY'] = data['OPENAI_KEY']
    os.environ['AZURE_KEY'] = data['AZURE_KEY']
    os.environ['AZURE_VERSION'] = data['AZURE_VERSION']
    os.environ['AZURE_ENDPOINT'] = data['AZURE_ENDPOINT']
    os.environ['PINECONE_KEY'] = data['PINECONE_KEY']
    os.environ['NOTION_KEY'] = data['NOTION_KEY']

    print(os.environ['OPENAI_KEY'])


def check_has_key():
    return ""
