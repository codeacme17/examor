from utils import api_result
from utils.MySQLHandler import MySQLHandler


def _get_files_by_noteId(noteId):
    query = """
                SELECT DISTINCT file_name
                FROM t_document
                WHERE note_id = %s
            """

    data = (noteId, )

    res = MySQLHandler().execute_query(query, data)

    return api_result.success(res)
