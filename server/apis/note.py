from utils.MySQLHandler import MySQLHandler


def _get_notes():
    select_query = "SELECT * FROM t_note;"
    res = MySQLHandler().execute_query(select_query)
    print(res)
