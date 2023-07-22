import mysql.connector


from fastapi import FastAPI
from typings.profile_types import Profile
from apis.profile import _set_profile, _get_profile, set_profile_to_env

from utils.dummy_data import insert, clear

app = FastAPI(validate_headers=False)

connection = mysql.connector.connect(
    user='root',
    password='root',
    host='localhost',
    port="52020",
    database='db'
)
print("DB connected")

# Create a cursor to execute SQL queries
cursor = connection.cursor()
# Execute the SELECT query to fetch data from t_note table
query = "SELECT * FROM t_note;"
cursor.execute(query)
# Fetch all rows and print the results
result = cursor.fetchall()
for row in result:
    print(row)


@app.on_event('startup')
def startup():
    set_profile_to_env()
    clear()
    insert()


@app.get("/profile")
def get_profile():
    return _get_profile()


@app.post("/profile")
def set_profile(data: Profile):
    return _set_profile(data)


@app.on_event("shutdown")
def shutdown_event():
    connection.close()


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=51717)
