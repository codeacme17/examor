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

    res = MySQLHandler().execute_query(query, data, single=True)
    return res


def get_document_info(
    document_id: int
):
    query = """
            SELECT *
            FROM t_document
            WHERE id = %s
            """
    data = (document_id, )

    res = MySQLHandler().execute_query(query, data, single=True)
    return res


def get_question_info(
    question_id: int
):
    query = """
            SELECT *
            FROM t_question
            WHERE id = %s
            """
    data = (question_id, )

    res = MySQLHandler().execute_query(query, data, single=True)
    return res


def get_note_info_by_document_id(
    document_id: int
):
    query = """
            SELECT *
            FROM t_note
            WHERE document_id = %s;
            """
    data = (document_id, )
    res = MySQLHandler().execute_query(query, data)

    print(res)
    return res


def is_key_name_duplicate_in_table(
    table_name: str,
    key_name: str
) -> bool:
    query = """
            SELECT * 
            FROM %s 
            WHERE name = %s
            """
    data = (table_name, key_name, )
    queryed_list = MySQLHandler().execute_query(query, data)

    if (len(queryed_list)):
        return True
    else:
        return False
