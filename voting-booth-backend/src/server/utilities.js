import {Worker, SHARE_ENV} from 'worker_threads';

/**
 * Handler for a promise such that the res and rej are returned as a tuple
 *   NOTE: one of these values (res, rej) will be undefined based on the promise's status
 *
 *  Example
 *    const [res, err] = await handle(getPromise());
 *
 * @param promise the promise to be handled
 * @return {Promise<T | *[]>} a promse with res and rej as a tuple
 */
export function handle(promise) {
    return promise
        .then(data => ([data, undefined]))
        .catch(err => Promise.resolve([undefined, err]));
}

/**
 * Check whether a user has voted or not according to expected
 *
 * @param chain the chain to be searched for the given voter
 * @param user the user being tested
 * @param expected the value of voting being tested for
 *   i.e. true iff testing whether user HAS voted
 *        false iff testing whether user HAS NOT voted
 * @return boolean determining whether user has voted
 */
export function hasVoted(chain, user, expected) {
    // some returns true iff, an el meets the criteria
    const actual = chain.some((block, idx) => {
        if (idx === 0)
            return;
        const {voter} = block.data;
        return voter.fname === user.fname && voter.lname === user.lname && voter.zip === user.zip;
    });
    // if expected is true, then get whether user has voted
    return actual === (expected === 'true');
}

/**
 * Start a worker thread
 *
 * @param path the file with worker code
 * @param cb the function to execute on message
 * @return {Worker} the created worker
 */
// TODO: give worker an id name
export function runWorker(path, cb) {
    const worker = new Worker(path, { env: SHARE_ENV });
    worker.on('exit', (exitCode) => {
        if (exitCode === 0) {
            return null;
        }
        return cb(new Error(`Worker has stopped with code ${exitCode}`));
    });
    worker.on('error', () => console.log('Worker encountered an error'));
    worker.on('online', () => console.log('Worker is online'));
    worker.on('message', cb);
    return worker;
}

/**
 * Submit a message containing a user and a candidate to a worker thread
 *
 * @param worker the spawned worker thread
 * @param user the user who is voting
 * @param email the email that will be notified upon completion
 * @param candidate the candidate being voted for
 */
export function submitVoteToFailsafe(worker, user, email, candidate) {
    worker.postMessage({ user, email, candidate });
}

/**
 * Prints a shutting down message and shuts down.
 * Does NOT do any cleanup
 *
 * @param exitCode the exit status of application. It will be
 * 0, if not provided.
 */
export function immediateShutdown(exitCode = 0) {
    console.log('Shutting down...');
    process.exit(exitCode);
}
