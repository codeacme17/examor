import os
import json

from utils import types

FILE_PATH = "profile.json"


def set_profile_to_env():
    init_profile_file()
    data: types.Profile = get_profile_from_file()

    os.environ['QUESTION_AMOUNT'] = data['questionAmount']
    os.environ['CURRENT_MODEL'] = data['currentModel']
    os.environ['OPENAI_API_KEY'] = data['openaiKey']
    os.environ['NOTION_KEY'] = data['notionKey']
    os.environ['OPENAI_VERSION'] = data['openaiVersion']
    os.environ['OPENAI_BASE'] = data['openaiBase']
    os.environ['AZURE_KEY'] = data['azureKey']
    os.environ['DEPLOYMENT_NAME'] = data['deploymentName']
    os.environ['PROXY'] = f"http://{data['proxy']}"


def init_profile_file():
    if os.path.isfile(FILE_PATH):
        return

    with open(FILE_PATH, "w") as file:
        json.dump({
            "questionAmount": "5",
            "currentModel": "OpenAI",
            "openaiKey": "",
            "azureKey": "",
            "openaiBase": "",
            "openaiVersion": "",
            "deploymentName": "",
            "notionKey": "",
            "proxy": ""
        }, file)


def get_profile_from_file() -> types.Profile:
    with open(FILE_PATH, "r") as file:
        data: types.Profile = json.load(file)
    return data
