import os
from fastapi import FastAPI
from typings.profile_types import Profile
from apis.profile import _set_profile, _get_profile, set_profile_to_env

app = FastAPI()


@app.on_event('startup')
def startup():
    set_profile_to_env()


@app.get("/profile")
def get_profile():
    return _get_profile()


@app.post("/profile")
def set_profile(data: Profile):
    return _set_profile(data)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=1717)
