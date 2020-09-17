import request from "superagent";

/**
 * Get the blockchain from the blockchain network
 *
 * @return {Promise<[]>} a chain of blocks containing vote data
 */
export function getBlockchain() {
    return new Promise((resolve, reject) => {
        request
            .get(`${process.env.BLOCKCHAIN_URL}/results`)
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

export function addBlock(data) {
    return new Promise((resolve, reject) => {
        request
            .post(`${process.env.BLOCKCHAIN_URL}/blocks`)
            .send(data)
            .then(res => {
                console.log(res);
                resolve(res);
            })
            .catch(console.log);
    });
}