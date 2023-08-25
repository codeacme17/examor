from db_services.MySQLHandler import MySQLHandler


def get_all_notes():
    query = """
            SELECT * 
            FROM t_note
            """
    return MySQLHandler().execute_query(query)


def get_note_by_id(id: int):
    query = """
            SELECT * 
            FROM t_note 
            WHERE id = %s
            """
    data = (id, )
    return MySQLHandler().execute_query(query, data, single=True)


def get_all_files_by_id(id: int):
    query = """
            SELECT *
            FROM t_file
            WHERE note_id = %s
            """
    data = (id, )
    return MySQLHandler().execute_query(query, data)


def get_inserted_note_id(
    noteName: str
):
    query = """
            INSERT INTO t_note (name) 
            VALUES (%s)
            """
    data = (noteName,)
    return MySQLHandler().insert_table_data(query, data)


def get_total_question_quantity(id: int):
    query = """
            SELECT COUNT(*) AS question_count
            FROM t_question
            WHERE document_id IN (
                SELECT id
                FROM t_document
                WHERE note_id = %s
            ); 
            """
    data = (id, )
    return MySQLHandler().execute_query(query, data)


def delete_note(id: int):
    query = """
            DELETE FROM t_note
            WHERE id = %s;
            """
    data = (id, )
    MySQLHandler().delete_table_data(query, data)


def update_icon(data):
    query = """
            UPDATE t_note
            SET icon = %s
            WHERE id = %s;
            """
    data = (data.icon, data.id, )
    MySQLHandler().update_table_data(query, data, )


def is_duplicate(name: str) -> bool:
    query = """
            SELECT * 
            FROM t_note 
            WHERE name = %s
            """
    data = (name,)
    duplicate_list = MySQLHandler().execute_query(query, data)

    if (len(duplicate_list)):
        return True
    else:
        return False
