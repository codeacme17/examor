from fastapi import FastAPI
from typings.config import ApiKeys
from apis.config import _config_api_keys, _get_api_keys, set_key_to_env

app = FastAPI()

set_key_to_env()


@app.post("/config/apiKeys")
def config_api_keys(data: ApiKeys):
    return _config_api_keys(data)


@app.get("/config/apiKeys")
def get_api_keys():
    return _get_api_keys()


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=1717)
