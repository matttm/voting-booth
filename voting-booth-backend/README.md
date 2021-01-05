# Voting Booth Backend

## Description
This the backend which does all processing for the voting-booth-frontend. This will use the records server for initial requests invollving authentication and JWT (JSON Web Tokens) there after. It will also use the locally running blockchain to submit voting data to.
## Getting Started
### Prerequisites
- Node 12.13.0
- yarn
- environment file (optional)
#### Making an environment file
The subproject will still work if you do not or cannot make the environment file. You will, however, loose the failsafe functionality, which is when a user is logged in but cannot vote due to an internal error (blockchain server not running), another thread will be spawned, dedicated to resubmitting the vote on some interval and emailing some completion message, whether a success or failure, depeends on whether server is eventually reachable.
The file should look like:
```
SENDGRID_USER=<username>
SENDGRID_PASSWORD=<password>
SENDGRID_API_KEY=<api_key>
```
SendGrid is a mail server. You can set up a SendGrid account for free if you do not have one and want to use this feature: www.sendgrid.com
### Installing
In this subproject's root, to install, run:
```
yarn
```
### Running Tests
Running the tests are encouraged!
Once everything is installed, you can enter:
```
yarn test
```
### Running
To run the this subproject in development mode, run:
```
yarn dev
```

## API Specification
The API specification can be found in ```API.md```
