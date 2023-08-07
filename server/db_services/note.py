from db_services.MySQLHandler import MySQLHandler


def get_inserted_note_id(
    noteName: str
):
    query = """
            INSERT INTO t_note (name) 
            VALUES (%s)
            """
    data = (noteName,)
    return MySQLHandler().insert_table_data(query, data)
