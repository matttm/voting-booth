import request from 'superagent';
import _sqlite from 'sqlite3';
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
// TODO: find a more efficient 'sleep' that doesn't rely on async/await
function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}
// TODO: get environment
const BACKEND_URL = 'localhost:3001';
// TODO: get voters
const voters = [
  {
    fname: 'Testy',
    lname: 'Test',
    zip: 13373,
    ssn: 136524512
  }
];
// todo: get candidates
const candidates = ['Joe Biden'];

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
  console.log(`${JSON.stringify(row)}`);
  if (user.fname === row.Fname && user.lname === row.lname
    && user.ssn === row.ssn && user.zip === row.zip) {
    console.log('Skipping user...');
    return;
  }
  // // TODO: get voter credentials
  // const credentials = voters[i];
  // let response = await request
  //   .post(`${BACKEND_URL}/api/login`)
  //   .send(credentials);
  // if (response.status !== 200) {
  //   throw new Error(`Script encountered an error`);
  // }
  // const bearerToken = `Bearer ${response.body.bearerToken}`;
  // // TODO: make index random
  // const candidate = candidates[0];
  // response = await request
  //   .post(`${BACKEND_URL}/api/votes`)
  //   .set('Authorization', bearerToken)
  //   .send({ candidate });
  // if (response.status !== 200) {
  //   throw new Error(`Script encountered an error`);
  // }
  console.log(`Sent simulated vote`);
  // wait for a minute
  sleep(1000);
});

db.close(err => {
  if (err) {
    console.log(`Database connection error encountered: ${err}`);
  }
  console.log('Database connection closed')
});
