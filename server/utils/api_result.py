from fastapi.responses import JSONResponse
import datetime
import json


class HttpCode(object):
    success = 0
    error = 1


def serialize_datetime(obj):
    if isinstance(obj, datetime.datetime):
        return obj.strftime('%Y-%m-%d')
    raise TypeError("Object of type datetime is not JSON serializable")


def result(
    code=HttpCode.success,
    message='',
    data=None,
    kwargs=None
):
    json_dict = {
        'data': data,
        'code': code,
        'message': message
    }

    if kwargs and isinstance(kwargs, dict) and kwargs.keys():
        json_dict.update(kwargs)

    json_str = json.dumps(json_dict, default=serialize_datetime)
    return JSONResponse(content=json.loads(json_str))


def success(data=None):
    return result(
        code=HttpCode.success,
        message='OK',
        data=data
    )


def error(message='', data=None):
    return result(
        code=HttpCode.error,
        message=message,
        data=data
    )
