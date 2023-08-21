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


def is_duplicate_note(
    key_name: str
) -> bool:
    query = "SELECT * FROM t_note WHERE name = %s"
    data = (key_name,)
    duplicate_list = MySQLHandler().execute_query(query, data)

    if (len(duplicate_list)):
        return True
    else:
        return False


def is_duplicate_file(
    note_id: int,
    file_name: str
) -> bool:
    query = """
            SELECT *
            FROM t_file
            WHERE note_id = %s
            AND file_name = %s;
            """
    data = (note_id, file_name, )
    duplicate_list = MySQLHandler().execute_query(query, data)

    if (len(duplicate_list)):
        return True
    else:
        return False
