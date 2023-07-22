from fastapi import FastAPI
from typings.profile_types import Profile

from utils.MySQLHandler import MySQLHandler
from apis.profile import _set_profile, _get_profile, set_profile_to_env
from apis.note import _get_notes

from utils.dummy_data import insert, clear

app = FastAPI(validate_headers=False)


@app.on_event('startup')
def startup():
    set_profile_to_env()
    MySQLHandler().connect_to_mysql()
    clear()
    insert()


@app.get("/profile")
def get_profile():
    return _get_profile()


@app.post("/profile")
def set_profile(data: Profile):
    return _set_profile(data)


@app.get("/notes")
def get_notes():
    return _get_notes()


@app.on_event("shutdown")
def shutdown_event():
    MySQLHandler().disconnect_from_mysql()


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=51717)
