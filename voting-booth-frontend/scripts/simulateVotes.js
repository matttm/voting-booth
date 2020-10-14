import request from 'superagent';
import _sqlite from 'sqlite3';

if (args.length === 2) {
  console.log('No user provided')
}
const args = process.argv;
const user = {
  fname: args[2],
  lname: args[3],
  ssn: args[4],
  zip: args[5]
};
// TODO: research module issue
// TODO: correct column names in db
const sqlite = _sqlite.verbose();
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
const sleep = ms => new Promise((res, rej) => setTimeout(res, ms));
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
 * Must wrap this in an async IIFE, so I can use await
 */
(async () => {
  /**
   * We use `length - 1` here because we do not want to submit a vote
   * as the last voter entry, which will be the person running the simulation
   */
  db.each(sql, async (err, row) => {
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
    await sleep(1000 * 600);
  });
})();

db.close(err => {
  if (err) {
    console.log(`Database connection error encountered: ${err}`);
  }
  console.log('Database connection closed')
});
