from utils.MySQLHandler import MySQLHandler
from utils import api_result


def _get_questions_by_note_id(
    note_id: int,
):
    query = """
            SELECT q.*
            FROM t_question q
            JOIN t_document d ON q.document_id = d.id
            WHERE d.note_id = %s
            LIMIT 10;            
            """
    data = (note_id, )

    res = MySQLHandler().execute_query(query, data)

    return api_result.success(res)
