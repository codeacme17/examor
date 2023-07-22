from fastapi.responses import JSONResponse


class HttpCode(object):
    success = 0
    error = 1


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

    return JSONResponse(json_dict)


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
