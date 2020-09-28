import request from "superagent";

/**
 * Get the blockchain from the blockchain network
 *
 * @return {Promise<[]>} a chain of blocks containing vote data
 */
export async function getBlockchain() {
    return request
        .get(`${process.env.BLOCKCHAIN_URL}/api/blocks`)
        .then(res => res.json())
        .then(res => res.body?.chain);
}

/**
 * Add a vote (block) to the blockchain
 *
 * @param data a vote
 * @return {Promise<boolean>}
 */
export async function addBlock(data) {
    return request
        .post(`${process.env.BLOCKCHAIN_URL}/api/blocks`)
        .send(data)
        .then(response => response.body?.success);
}
