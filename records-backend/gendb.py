import sqlite3
import sys
import argparse
from faker import Faker
from sqlite3 import Error
"""
Generate a database of records
"""

INSERT_SQL = "INSERT INTO person (ssn, fname, lname, zip) VALUES (?, ?, ?, ?)"

def parse_arguments():
    short_options = "n:flsz"
    long_options = []
    pass

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
        ssn VARCHAR(9) not null,
        Fname VARCHAR(45) NOT NULL,
        lname VARCHAR(45) NOT NULL,
        zip VARCHAR(5) NOT NULL
    )"""
    cur.execute(table)


def add_person(cur, ssn, fname, lname, zip):
    cur.execute(INSERT_SQL, (ssn, fname, lname, zip))

def add_dummy_persons(number_of_persons, faker, conn):
    cur = conn.cursor()
    for i in range(number_of_persons):
        fname, lname = faker.name().split()[0:2]
        ssn = faker.ssn()
        zip = faker.postcode()
        add_person(cur, ssn, fname, lname, zip)

if __name__ == '__main__':
    number_of_persons = 100
    Faker.seed(0)
    faker = Faker()
    conn = create_connection(r"pythonsqlite.db")
    build_database(conn)
    add_dummy_persons(number_of_persons, faker, conn)
    conn.commit()
    conn.close()
    print("Created database")