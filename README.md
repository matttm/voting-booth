# Voting Booth

## Description
This project is a voting booth simulator consisting of four subprojects:
- voting-booth-frontend
- voting-booth-backend
- blockchain-server
- records-backend

```voting-booth-frontend``` is a seamless voting app developed in Angular 7.

```voting-booth-backend``` is an Express server that uses the ```records-backend``` to authenticate voters and the ```blockchain-server``` to store votes

```records-backend``` is a SpringBoot application that offers a RESTful API for interacting with citizens

```blockchain-server``` is a blockchain that communicates with other blockchains through WebSockets and offers a RESTful API for interacting with the blockchain.

## Getting Started
To properly run this web app, you must follow the ```Getting Started``` section in each of the four subprojects, and then continue following this section.

After following the ```Getting Started``` in the subprojects, the best order to start the projects is records-backend, blockchain-server, voting-booth-backend, voting-booth-frontend, so start each subproject according to the method documented in its README.Once all subprojects are running, the voting-booth-frontend will be able to successfully login and vote. If all services are not running, the frontend will display an error message in a snackbar indicating the reason for failure. This error will implicitly denote the service not running.
## Architecture
```
+-------------------+  +--------------------+                       
|                   |  |                    |                       
|  records-backend  |  | blockchain-server  |                       
|                   |  |                    |                       
|                   |  |                    |                       
+-------------------+  +----------|---------+                       
          |                       |                                 
          +-----------+-----------+                                 
                      |                                             
           +----------|----------+          +----------------------+
           |                     |          |                      |
           |voting-booth-backend |          |voting-booth-frontend |
           |                     -----------+                      |
           |                     |          |                      |
           +---------------------+          +----------------------+
```
The voting-booth-backend uses the records-backend and the blockchain-server as services. The records-backend is used to authenticate user information that is provided in the vb-frontend and sent to the vb-backend. The blockchain-server is used to store the votes that are submitted in the vb-frontend and sent to the vb-backend.
## Built With
- Angular 7
- Node 12.13.0
- Express 4
- Nodemailer
- SpringBoot
- SQLite
## Authors
- matttm : Matt Maloney
## License
This project is licensed under the MIT License - see the LICENSE.md file for details

