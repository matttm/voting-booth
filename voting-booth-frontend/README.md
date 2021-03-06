# Voting Booth Frontend

## Description

This is the frontend server that communicatws with the backend. In this, a user can view candidate information, view voting results, and vote, where voting requires logging in.

## Running

To run, we will use a development for better seperation of concerns during development.

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Simulating Votes

If you want to see more interesting voting results than just seeing that only you voted, you can run:
```
yarn simulate
```
This will submit a vote for every person in the database except the last person, which will be the user's credentials, meaning everyone but the user has voted.
**Note: This requires you to have generated a database in the records backend**

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
