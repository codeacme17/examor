from fastapi import FastAPI
from typings.profile_types import Profile
from apis.profile import _set_profile, _get_profile, set_profile_to_env

app = FastAPI()

set_profile_to_env()


@app.post("/profile")
def set_profile(data: Profile):
    return _set_profile(data)


@app.get("/profile")
def get_profile():
    return _get_profile()


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=1717)
