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
