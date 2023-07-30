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
