import mysql.connector


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
            self.conn = mysql.connector.connect(**self.config)
            self.cursor = self.conn.cursor(buffered=True, dictionary=True)

        except mysql.connector.Error as err:
            print("Error: {}".format(err))

    def execute_query(
        self,
        query: str,
        data=(),
        single: bool = False
    ):
        try:
            self.connect_to_mysql()
            self.cursor.execute(query, data)

            if (single):
                return self.cursor.fetchone()
            return self.cursor.fetchall()

        except mysql.connector.Error as err:
            print("Error: {}".format(err))
            return None

    # update table data
    def update_table_data(
        self,
        query: str,
        data=()
    ):
        try:
            self.connect_to_mysql()
            self.cursor.execute(query, data)
            self.conn.commit()
            print(f"Data updated successfully.")

        except mysql.connector.Error as err:
            self.conn.rollback()
            print("Error: {}".format(err))

        finally:
            self.disconnect_from_mysql()

    # insert table data
    def insert_table_data(
        self,
        query,
        data=()
    ):
        try:
            self.connect_to_mysql()
            self.cursor.execute(query, data)
            self.conn.commit()
            print("New data inserted successfully.")
            inserted_id = self.cursor.lastrowid
            return inserted_id

        except mysql.connector.Error as err:
            self.conn.rollback()
            print("Error: {}".format(err))

        finally:
            self.disconnect_from_mysql()

    # delete table data by id
    def delete_table_data(self, query, data):
        try:
            self.connect_to_mysql()
            self.cursor.execute(query, data)
            self.conn.commit()
            print("Note with ID {} deleted successfully.".format(id))

        except mysql.connector.Error as err:
            self.conn.rollback()
            print("Error: {}".format(err))

        finally:
            self.disconnect_from_mysql()

    # disconnect
    def disconnect_from_mysql(self):
        try:
            if self.cursor is not None:
                self.cursor.close()
            if self.conn is not None and self.conn.is_connected():
                self.conn.close()

        except mysql.connector.Error as err:
            print("Error: {}".format(err))
