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


def get_total_question_quantity(
    note_id: int
):
    query = """
            SELECT COUNT(*) AS question_count
            FROM t_question
            WHERE document_id IN (
                SELECT id
                FROM t_document
                WHERE note_id = %s
            ); 
            """
    data = (note_id, )
    return MySQLHandler().execute_query(query, data)
