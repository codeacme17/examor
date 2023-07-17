from fastapi import FastAPI
from typings.profile_types import ApiKeys
from apis.profile import _set_api_keys, _get_api_keys, set_key_to_env

app = FastAPI()

set_key_to_env()


@app.post("/profile/apiKeys")
def set_api_keys(data: ApiKeys):
    return _set_api_keys(data)


@app.get("/profile/apiKeys")
def get_api_keys():
    return _get_api_keys()


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=1717)
