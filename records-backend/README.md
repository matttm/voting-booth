# Records Backend

## Description
This is a SpringBoot server that maintains a SQLiute database.
## Getting Started
To run the server, you must generate the database containing the records.
### Generating the database
First, install the required pacxkages inno the python environment
```
pipenv install
```
Next, the pythen environment has to be entered with:
```
pipenv shell
```
Then, generate the database with:
```
python gendb.py <number_of_records> <first_name> <last_name> <zip_code> <ssn>
```
  number_of_records - the number of records in the database
  first_name - the user's first name
  last_name - the user's last name
  zip_code - the user's zip code
  ssn - the user's social security number
**
Note: fake information can be used here as it is only used for authentication
**
Finally, the environment can be exited with:
```
exit
```


## Running
The server can be ran with:
```
./gradlew bootRun
```

## Running unit tests
The unit tests can be ran with
```
./gradlew test
```

## API Specification

The API specification can b found in the file ```API.md```.
