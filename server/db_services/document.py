from db_services.MySQLHandler import MySQLHandler


def get_document_by_id(id: int):
    query = """
            SELECT *
            FROM t_document
            WHERE id = %s
            """
    data = (id, )
    return MySQLHandler().execute_query(query, data, single=True)


def save_doc_to_db(
    note_id: int,
    file_id: int,
    filename: str,
    doc: str
):
    query = """
            INSERT INTO t_document (note_id, file_id, file_name, document) 
            VALUES (%s, %s, %s, %s)
            """
    data = (
        note_id,
        file_id,
        filename,
        doc,
    )
    return MySQLHandler().insert_table_data(query, data)
