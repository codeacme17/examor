import json

from typings.profile_types import Profile
from utils.profile_handler import set_key_to_env, get_profile_from_file


def _set_profile(data: Profile):
    FILE_PATH = "profile.json"

    with open(FILE_PATH, "w") as file:
        json.dump({
                  'openaiKey': data.openaiKey,
                  'notionKey': data.notionKey,
                  'proxy': data.proxy,
                  }, file)

    set_key_to_env()
    return {"message": "success"}


def _get_profile():
    return get_profile_from_file()
