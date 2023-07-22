import mysql.connector

# MySQL connection configuration
config = {
    'user': 'root',
    'password': 'root',
    'host': 'localhost',
    'port': "52020",
    'database': 'db',
    'raise_on_warnings': True,
}


def insert():
    # Sample data to insert into the tables
    note_data = [
        (1, 'Note 1'),
        (2, 'Note 2'),
        # Add more rows as needed
    ]

    document_data = [
        (1, 1, 'mdi-text-box-outline', 'file1.md', 'Document content 1'),
        (2, 1, 'mdi-text-box-outline', 'file2.md', 'Document content 2'),
        # Add more rows as needed
    ]

    question_data = [
        (1, 'Question 1', 1, '0', 100, 'Answer 1'),
        (2, 'Question 2', 1, '0', 80, 'Answer 2'),
        # Add more rows as needed
    ]

    record_data = [
        (1, 1, '2023-07-22 12:00:00', 90, '1'),
        (2, 1, '2023-07-23 13:30:00', 70, '1'),
        # Add more rows as needed
    ]

    try:
        # Connect to MySQL server
        conn = mysql.connector.connect(**config)

        # Create a cursor to execute SQL queries
        cursor = conn.cursor()

        # Insert data into t_note table
        insert_note_query = "INSERT INTO t_note (id, name) VALUES (%s, %s)"
        cursor.executemany(insert_note_query, note_data)

        # Insert data into t_document table
        insert_document_query = "INSERT INTO t_document (id, note_id, icon, file_name, document) VALUES (%s, %s, %s, %s, %s)"
        cursor.executemany(insert_document_query, document_data)

        # Insert data into t_question table
        insert_question_query = "INSERT INTO t_question (id, content, document_id, is_pushed, progress, gpt_answer) VALUES (%s, %s, %s, %s, %s, %s)"
        cursor.executemany(insert_question_query, question_data)

        # Insert data into t_record table
        insert_record_query = "INSERT INTO t_record (id, question_id, answer_time, score, is_answered) VALUES (%s, %s, %s, %s, %s)"
        cursor.executemany(insert_record_query, record_data)

        # Commit the changes to the database
        conn.commit()

        print("Data inserted successfully!")

    except mysql.connector.Error as err:
        print("Error: {}".format(err))

    finally:
        # Close the cursor and connection
        if 'cursor' in locals() and cursor is not None:
            cursor.close()

        if 'conn' in locals() and conn.is_connected():
            conn.close()


def clear():
    table_names = ['t_note', 't_document', 't_question', 't_record']

    try:
        # Connect to MySQL server
        conn = mysql.connector.connect(**config)

        # Create a cursor to execute SQL queries
        cursor = conn.cursor()

        # Clear data from each table
        for table in table_names:
            # Using DELETE query to clear data
            delete_query = f"DELETE FROM {table};"
            cursor.execute(delete_query)

            # If you prefer to use TRUNCATE query instead of DELETE, uncomment the line below:
            # truncate_query = f"TRUNCATE TABLE {table};"
            # cursor.execute(truncate_query)

            print(f"Data cleared from table {table}.")

        # Commit the changes to the database
        conn.commit()

    except mysql.connector.Error as err:
        print("Error: {}".format(err))

    finally:
        # Close the cursor and connection
        if 'cursor' in locals() and cursor is not None:
            cursor.close()

        if 'conn' in locals() and conn.is_connected():
            conn.close()
