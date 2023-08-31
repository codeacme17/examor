import datetime

from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse


class HttpCode(object):
    success = 0
    error = 1


def serialize_datetime(obj):
    if isinstance(obj, datetime.datetime):
        return obj.strftime('%Y-%m-%d')
    return obj


def result(
    code=HttpCode.success,
    message='',
    data=None,
):
    """
    Creates a JSON response with the given code, message, and data.

    :param code: The HTTP code to use.
    :param message: The message to include in the response.
    :param data: The data to include in the response.
    :return: A JSON response object.
    """
    json_dict = {
        'data': data,
        'code': code,
        'message': message
    }

    return JSONResponse(content=jsonable_encoder(json_dict))


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
