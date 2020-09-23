import sqlite3
import argparse
import sys
import re
from faker import Faker
from sqlite3 import Error
"""
Generate a database of records with the command line arguments as an entry
"""

INSERT_SQL = "INSERT INTO person (ssn, fname, lname, zip) VALUES (?, ?, ?, ?)"

def parse_arguments():
    """
    Parse arguments
    """
    parser = argparse.ArgumentParser()
    parser.add_argument("number_of_records", help="number of people", type=int)
    parser.add_argument("firstname",         help="first name off entry")
    parser.add_argument("lastname",          help="last name off entry")
    parser.add_argument("ssn",               help="hyphenated ssn of entry")
    parser.add_argument("zip",               help="zip code off entry")
    args = parser.parse_args()
    return args

def create_connection(db_file):
    """ create a database connection to a SQLite database """
    conn = None
    try:
        conn = sqlite3.connect(db_file)
        return conn
    except Error as e:
        print(e)
        exit(-1)

def build_database(cur):
    """
    Build 'persons' table in db
    :param cur: a database connection cursor
    """
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
    """
    A a person record to persons table
    :param cur: a database connection's cursor
    :param ssn: a ssn of entry
    :param fname: first name of entry
    :param lname: last name of entry
    :param zip: zip code of entry
    """
    cur.execute(INSERT_SQL, (ssn, fname, lname, zip))

def add_dummy_persons(number_of_persons, faker, cur):
    """
    Adds a given number of person records to the persons table
    :param number_of_persons: number of records to add
    :param faker: an object to generate fake data
    :param cur: a database connection cursor
    """
    for i in range(number_of_persons):
        fname, lname = faker.name().split()[0:2]
        ssn = faker.ssn()
        zip = faker.postcode()
        add_person(cur, ssn, fname, lname, zip)

if __name__ == '__main__':
    args  = parse_arguments()
    number_of_records = args.number_of_records
    fname = args.firstname
    lname = args.lastname
    ssn   = args.ssn
    zip   = args.zip
    if bool(re.match("^(\d{3}-\d{2}-\d{4})", ssn)) is False:
        print("Social Security Number does not follow the pattern: XXX-XX-XXXX")
        sys.exit(0)

    # seed generator of fake data
    Faker.seed(0)
    faker = Faker()
    try:
        conn = create_connection(r"pythonsqlite.db")
        cur = conn.cursor()
        build_database(cur)
        add_dummy_persons(number_of_records, faker, cur)
        # add non random entry
        add_person(cur, ssn, fname, lname, zip)
        conn.commit()
        conn.close()
        print("Created database")
    except sqlite3.OperationalError:
        print("Person table already exists)")
        print("Shutting down...")