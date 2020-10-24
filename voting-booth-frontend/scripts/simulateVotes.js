import request from 'superagent';
import _sqlite from 'sqlite3';
import { readFileSync } from 'fs';
const sqlite = _sqlite.verbose();

const args = process.argv;
if (args.length === 2) {
  console.log('No user provided')
}
const user = {
  fname: args[2],
  lname: args[3],
  ssn: args[4],
  zip: args[5]
};
// TODO: research module issue
// TODO: correct column names in db
let db = new sqlite.Database('../records-backend/records.db', sqlite.OPEN_READONLY, err => {
  if (err) {
    console.log(`Database connection error encountered: ${err}`);
  }
  console.log('Database connection established')
});
/**
 * This script is designed to simulate votes, where each vote will be
 * by a person in the records.db and for a random candidate from candidate.json
 **/
/**
 * Cause the process to sleep for a given amount of time
 *
 * @param milliseconds time to sleep in milliseconds
 */
// TODO: find a more efficient 'sleep' that doesn't rely on async/await
function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

// TODO: get environment
const BACKEND_URL = 'localhost:3000';

// todo: get candidates
let candidates = readFileSync('src/assets/candidates.json');
candidates = JSON.parse(candidates)
  .map(candidate => candidate.name)
  .forEach(name => console.log(name));

/**
 * Get a random candidate from an array of candidates
 *
 * @return {string} a candidate name
 */
function getRandomCandidate() {
  return candidates[Math.floor(Math.random() * candidates.length)];
}
getRandomCandidate = getRandomCandidate.bind(this);
let sql = `SELECT * FROM person`;

/**
* The db.each function is optimized for using large databases. Since, I don't
* know how large the database will be, I will use this, and since it only works
* with plain ol' callbacks, I cannot use async/await with the superagent stuff.
*/
db.each(sql, (err, row) => {
  if (err) {
    throw err;
  }
  if (user.fname === row.Fname && user.lname === row.lname
    && user.ssn === row.ssn && user.zip === row.zip) {
    console.log('Skipping user...');
    return;
  }
  const credentials = {
    fname: row.Fname,
    lname: row.lname,
    ssn: row.ssn,
    zip: row.zip
  };
  console.log(`${JSON.stringify(credentials)}`);
  request
    .post(`${BACKEND_URL}/api/login`)
    .send(credentials)
    .then(authResponse => {
      if (authResponse.status !== 200) {
        throw new Error(`Script encountered an error`);
      }
      const bearerToken =`Bearer ${authResponse.body.idToken}`;
      // TODO: make index random
	  	  console.log(`candidate: ${getRandomCandidate}`);
	  const candidate = getRandomCandidate();
      request
        .post(`${BACKEND_URL}/api/votes`)
        .set('Authorization', bearerToken)
        .send({ candidate })
        .then(voteResponse => {
		  console.log(voteResponse.status);
          if (voteResponse.status !== 200) {
            throw new Error(`Script encountered an error`);
          } else {
            console.log(`Sent simulated vote`);
          }
        }).catch(err => {
          console.log(`Error @ voting: ${err}`);
      });
    }).catch(err => {
    console.log(`Error @ login: ${err}`);
  });
  // wait for a minute
  sleep(10);
});

db.close(err => {
  if (err) {
    console.log(`Database connection error encountered: ${err}`);
  }
  console.log('Database connection closed')
});
