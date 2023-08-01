from db_services.MySQLHandler import MySQLHandler


def save_doc_to_db(
    note_id: int,
    filename: str,
    doc: str
):
    query = """
            INSERT INTO t_document (note_id, file_name, document) 
            VALUES (%s, %s, %s)
            """
    data = (
        note_id,
        filename,
        doc,
    )
    id = MySQLHandler().insert_table_data(
        query,
        data
    )
    return id
