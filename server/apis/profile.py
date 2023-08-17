import json

from utils import api_result, profile_handler, types
from lang_chain import check_key_correct as _check_key_correct


# Get user profile
def get_profile():
    data = profile_handler.get_profile_from_file()
    return api_result.success(data)


# Set user profile to `profile.json` file
def set_profile(data: types.Profile):
    profile_handler.set_profile_to_file(data)
    profile_handler.set_profile_to_env()
    return api_result.success()


def check_key_correct():
    try:
        _check_key_correct()
    except BaseException as e:
        return api_result.error(e.error.message)

    return api_result.success()
