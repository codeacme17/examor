from db_services.MySQLHandler import MySQLHandler


def add_file_to_db(
    note_id: int,
    filename: str,
    question_count: int = 0,
    is_uploading: str = '1'
):
    query = """
            INSERT INTO t_file (note_id, file_name, question_count, is_uploading) 
            VALUES (%s, %s, %s, %s)
            """
    data = (note_id, filename, question_count, is_uploading, )
    return MySQLHandler().insert_table_data(query, data)


def set_file_is_uploading_state(file_id: int, question_count: int = 0):
    query = """
             UPDATE t_file
             SET is_uploading = "0", question_count = %s
             WHERE id = %s;
             """
    data = (question_count, file_id, )
    MySQLHandler().update_table_data(query, data)


def get_question_count(file_id: int):
    query = """
            SELECT question_count
            FROM t_file
            WHERE id = %s;
            """
    data = (file_id, )
    res = MySQLHandler().execute_query(query, data, True)
    question_count = res["question_count"]
    # BC (old version v0.3.0)
    if question_count is None or question_count == 0:
        query = """
                SELECT COUNT(*) AS question_count
                FROM t_question q
                LEFT JOIN t_document d ON q.document_id = d.id
                LEFT JOIN t_file f ON d.file_id = f.id
                WHERE f.id = %s
                """
        data = (file_id, )
        question_count = MySQLHandler().execute_query(query, data, True)
    return question_count


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


def is_duplicate(
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
