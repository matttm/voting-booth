

Records backend API Specification

The following endpoints are prefixed by the ```api/persons``` path:

- GET - ```/test```
Returns a string containing ```Testing...``` for testing

- POST - ```/```
Creates a new person entry in the persons collection with attriubutes dictated by the request body
request body should be a JSON object with ```fname```, ```lname```, ```ssn```, ```zip``` keys

- GET - ```/```
Returns the entire persons collection as an array where each element is a person object in JSON

- GET - ```/forgot-id```
When this endpoint is provided with a ```ssn``` (currently unencrypted) as a field in the request header,
the response will contain a JSON message with a success and a data key, where the data will be the id

- GET - ```/validate```
When provided a person object in the request body, the controller's response will contain a JSON message
with a success and a data key, where the data's value is a boolean of whether the database contains this
person

- PUT - ```/{id:[0-9]+}```
When provided a person object in the request body, the controller will update the person in the database with an
id matching the one specified in the path

- DELETE - ```{id:[0-9]+}```
Delete a person from the database, with an id matching the id specified the one in the endpoint's path
