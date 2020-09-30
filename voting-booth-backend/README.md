# Voting Booth Backend

## API Specification
### Endpoint ```api/authentic```
#### Type GET
#### Description
Used to determine if the sender of the request is seen as an authenticated user by the server
##### Request
###### Header
Header must include an ```Authorization``` key, where the value is the JWT received from the server, preceded by ```Bearer ```
###### Body
Not Applicable
###### Example
```
headers: {
    ...,
    Authorization: "Bearer ey7hcaziv..."
},
body: {}
```
##### Reply
Status of ```200``` if the sender is authenticated, whereas a status of ```401``` if not.

### Endpoint ```api/login```
#### Type GET
##### Description
Used inorder for the sender to be recognized by the server, when an endpoint requires authorization.
##### Request
###### Header
Not Applicable
###### Body
Body must contain all information needed for authentication--first name, last name, social security number, zipcode--with the keys as specified by the example
###### Example
```
headers: {},
body: {
    fname: 'Matt',
    lname: 'Maloney',
    ssn: '145-90-6354',
    zip: '90123'
}
```
**The social security number will require encryption in later versions**
##### Reply
If not authenticated, a status of ```401``` will be returned on the ```text``` key, otherwise a status of ```201``` with a JWT and an expiration date, specified by keys as in the example.
###### Example
```
headers: {},
body: {
    idToken: "ey7..."
    expiresIn: "2 h"
}
```
**Note: The ```idToken``` is not prefixed by ```Bearer ``` as the ```authenticate``` endpoint specifies.**
### Endpoint ```api/votes```
#### Type POST
#### Description
Used toncast a vote for a presidential nominee.
##### Request
###### Header
Header must contain a valid bearer token
###### Body
Body must contain a vote, which is an object with a candidate
###### Example
```
headers: {
    ...,
    Authorization: "Bearer e7y..."
},
body:
    vote: {
        candidate: "Jo Jorgensen"
    }
]
```
##### Reply
A status of ```401``` will be returned if the requester is not authenticated, otherwise a status of ```200``` will be returned with a ```status``` in the body, speecifying whether the vote was successfully added.
###### Example
```
body: {
    success: {
        true
    }
}
```
### Endpoint ```api/user```
#### Type GET
#### Description
Used for determining if a user has voted
##### Example
```api/user?has-voted=true```
#### Request
##### Header
Header must contain a JWT Bearer token
##### Body
Not Applicable
##### Example
```
headers: {
    ...,
    Authorization: 'Bearer ey7...'
},
body: {}
```
#### Reply
The response body will contain a success and a hasVoted key
##### Example
```
success: true,
hasVoted: true
```
### Endpoint ```api/results```
#### Type GET
##### Description
Used to get results of election
#### Request
The request does not need to contain any specific information
#### Reply
##### Header
Not Applicable
##### Body
Body will contain a success key and a results object, which is a destructured Map object
###### Example
```
body: {
    success: true,
    results: [[ 'Timmy, 2], ['Jo', 3], ...]]
```
