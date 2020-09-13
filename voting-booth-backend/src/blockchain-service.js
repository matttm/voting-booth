import request from "superagent";

/**
 * Get the blockchain from the blockchain network
 *
 * @return {Promise<[]>} a chain of blocks containing vote data
 */
export function getBlockchain() {
    return new Promise((resolve, reject) => {
        request
            .get('/results')
            .then(res => console.log(res))
            .then(res => {
                const body = res.body;
                if (body.success) {
                    resolve(body.chain);
                } else {
                    console.log('There was an error in retrieving the blockchain');
                }
            });
    });
}
