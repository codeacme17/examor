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
            self.cursor = self.conn.cursor(buffered=True, dictionary=True)

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

    def update_table_data(self, table_name, set_values, condition):
        try:
            self.connect_to_mysql()

            update_query = f"UPDATE {table_name} SET {set_values} WHERE {condition}"

            self.cursor.execute(update_query)
            self.conn.commit()
            print(f"Data in {table_name} updated successfully.")

        except mysql.connector.Error as err:
            self.conn.rollback()
            print("Error: {}".format(err))

        finally:
            self.disconnect_from_mysql()

    def disconnect_from_mysql(self):
        try:
            # Close the cursor and connection
            if self.cursor is not None:
                self.cursor.close()
            if self.conn is not None and self.conn.is_connected():
                self.conn.close()

        except mysql.connector.Error as err:
            print("Error: {}".format(err))
