import request from 'superagent';
/**
 * This script is designed to simulate votes, where each vote will be
 * by a person in the records.db and for a random candidate from candidate.json
 **/
// TODO: get environment
  const BACKEND_URL = 'localhost:3001';
// TODO: get voters
const voters = [];
// todo: get candidates
const candidates = ['Joe Biden'];

/**
 * We use `length - 1` here because we do not want to submit a vote
 * as the last voter entry, which will be the person running the simulation
 */
for (let i = 0; i < voters.length - 1; i++) {
  // TODO: get voter credenials
  const credentials = {};
  let response = await request
    .post(`${BACKEND_URL}/api/login`)
    .send(credentials);
}
