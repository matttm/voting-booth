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
