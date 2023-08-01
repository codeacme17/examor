from db_services.MySQLHandler import MySQLHandler


def get_note_info(
    note_id: int
):
    query = """
            SELECT *
            FROM t_note
            WHERE id = %s
            """
    data = (note_id, )
    return MySQLHandler().execute_query(query, data, single=True)


def get_document_info(
    document_id: int
):
    query = """
            SELECT *
            FROM t_document
            WHERE id = %s
            """
    data = (document_id, )
    return MySQLHandler().execute_query(query, data, single=True)


def get_question_info(
    question_id: int
):
    query = """
            SELECT *
            FROM t_question
            WHERE id = %s
            """
    data = (question_id, )
    return MySQLHandler().execute_query(query, data, single=True)


def is_duplicate(
    table_name: str,
    key_name: str
) -> bool:
    query = """
            SELECT * 
            FROM %s 
            WHERE name = %s
            """
    data = (table_name, key_name, )

    if (len(MySQLHandler().execute_query(query, data))):
        return True
    else:
        return False
