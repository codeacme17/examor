import db_services as _dbs_

from utils import api_result, types
from lang_chain import check_key_correct as _check_key_correct


def get_profile():
    data = _dbs_.profile.get_profile()
    return api_result.success(data)


def set_profile(data: types.Profile):
    _dbs_.profile.set_profile(data)
    _dbs_.profile.set_profile_to_env()
    return api_result.success()


def check_key_correct():
    try:
        _check_key_correct()
    except Exception as e:
        return api_result.error(str(e))

    return api_result.success()
