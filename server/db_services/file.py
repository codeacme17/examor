from db_services.MySQLHandler import MySQLHandler


def add_file_to_db(
    note_id: int,
    filename: str
):
    query = """
            INSERT INTO t_file (note_id, file_name) 
            VALUES (%s, %s)
            """
    data = (note_id, filename, )
    return MySQLHandler().insert_table_data(query, data)


def set_file_is_uploading_state(
    file_id: int
):
    query = """
             UPDATE t_file
             SET is_uploading = "0"
             WHERE id = %s;
             """
    data = (file_id, )
    MySQLHandler().update_table_data(query, data)


def get_uploading_files():
    query = """
            SELECT id, note_id, file_name
            FROM t_file
            WHERE is_uploading = "1";
            """
    return MySQLHandler().execute_query(query)


def delete_file(
    file_id: int
):
    query = """
            DELETE FROM t_file
            WHERE id = %s;
             """
    data = (file_id, )
    MySQLHandler().delete_table_data(query, data)
