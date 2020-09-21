import request from "superagent";

/**
 * Get the blockchain from the blockchain network
 *
 * @return {Promise<[]>} a chain of blocks containing vote data
 */
export async function getBlockchain() {
    const response = await request
        .get(`${process.env.BLOCKCHAIN_URL}/api/blocks`);
    const chain = response.body?.chain;
    if (chain) {
        return JSON.parse(chain);
    } else {
        console.log('Could not get voting blockchain');
        return [];
    }
}

/**
 * Add a vote (block) to the blockchain
 *
 * @param data a vote
 * @return {Promise<boolean>}
 */
export async function addBlock(data) {
    const response = await request
        .post(`${process.env.BLOCKCHAIN_URL}/api/blocks`)
        .send(data);
    return response.body?.success;
}
