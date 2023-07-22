import json

from utils import api_result
from utils import profile_handler
from typings.profile_types import Profile


def _set_profile(data: Profile):
    FILE_PATH = "profile.json"

    with open(FILE_PATH, "w") as file:
        json.dump({
                  'openaiKey': data.openaiKey,
                  'notionKey': data.notionKey,
                  'proxy': data.proxy,
                  }, file)

    profile_handler.set_profile_to_env()
    return api_result.success()


def _get_profile():
    data = profile_handler.get_profile_from_file()
    return api_result.success(data)
