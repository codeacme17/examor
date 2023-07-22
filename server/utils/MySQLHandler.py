import mysql.connector
from mysql.connector.cursor import MySQLCursor


class MySQLHandler:
    def __init__(self):
        self.config = {
            'user': 'root',
            'password': 'root',
            'host': 'localhost',
            'port': "52020",
            'database': 'db',
            'raise_on_warnings': True,
        }
        self.conn = None
        self.cursor = None

    def connect_to_mysql(self):
        try:
            # Connect to MySQL server
            self.conn = mysql.connector.connect(**self.config)
            self.cursor = self.conn.cursor(buffered=True)

        except mysql.connector.Error as err:
            print("Error: {}".format(err))

    def execute_query(self, query: str):
        try:
            self.connect_to_mysql()
            self.cursor.execute(query)
            return self.cursor.fetchall()

        except mysql.connector.Error as err:
            print("Error: {}".format(err))
            return None

    def disconnect_from_mysql(self):
        try:
            # Close the cursor and connection
            if self.cursor is not None:
                self.cursor.close()
            if self.conn is not None and self.conn.is_connected():
                self.conn.close()

        except mysql.connector.Error as err:
            print("Error: {}".format(err))
