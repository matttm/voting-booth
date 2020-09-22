import sqlite3
from sqlite3 import Error
"""
Generate a database of records
"""

def create_connection(db_file):
    """ create a database connection to a SQLite database """
    conn = None
    try:
        conn = sqlite3.connect(db_file)
        print(sqlite3.version)
        return conn
    except Error as e:
        print(e)
        exit(-1)

def build_database(conn):
    """
    Build 'persons' table in db
    :param ocnn: a sqlite3 connection that is open
    :return:
    """
    cur = conn.cursor()
    # TODO: change table name to 'persons'
    table = """
    CREATE TABLE person (
        id integer PRIMARY KEY,
        ssn text not null,
        Fname text NOT NULL,
        lname text NOT NULL,
        zip text NOT NULL
    )"""
    cur.execute(table)
    insert_sql = "INSERT INTO person (ssn, fname, lname, zip) VALUES (?, ?, ?, ?)"
    cur = conn.cursor()
    cur.execute(insert_sql, ('1892029', 'afname', 'alname', '19029'))
    conn.commit()


if __name__ == '__main__':
    conn = create_connection(r"pythonsqlite.db")
    build_database(conn)
    conn.close()
    print("Created database")