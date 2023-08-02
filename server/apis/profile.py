import json

from utils import api_result, profile_handler, types


def _set_profile(data: types.Profile):
    FILE_PATH = "profile.json"

    with open(FILE_PATH, "w") as file:
        json.dump({
            'questionAmount': data.questionAmount,
            'openaiKey': data.openaiKey,
            'azureKey': data.azureKey,
            'openaiBase': data.openaiBase,
            'openaiVersion': data.openaiVersion,
            'deploymentName': data.deploymentName,
            'notionKey': data.notionKey,
            'proxy': data.proxy,
        }, file)

    profile_handler.set_profile_to_env()
    return api_result.success()


def _get_profile():
    data = profile_handler.get_profile_from_file()
    return api_result.success(data)
