import os
import json

from typings.profile_types import Profile

FILE_PATH = "profile.json"


def set_profile_to_env():
    init_profile_file()

    data: Profile = get_profile_from_file()

    os.environ['OPENAI_KEY'] = data['openaiKey']
    os.environ['NOTION_KEY'] = data['notionKey']
    os.environ['PROXY'] = data['proxy']


def init_profile_file():
    if os.path.isfile(FILE_PATH):
        return

    with open(FILE_PATH, "w") as file:
        json.dump({
            'openaiKey': "",
            'notionKey': "",
            'proxy': ""
        }, file)


def get_profile_from_file() -> Profile:
    with open(FILE_PATH, "r") as file:
        data: Profile = json.load(file)
    return data


def check_has_key():
    return ""
