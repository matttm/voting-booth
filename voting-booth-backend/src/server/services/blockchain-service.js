import request from "superagent";

/**
 * Get the blockchain from the blockchain network
 *
 * @return {Promise<[]>} a chain of blocks containing vote data
 */
export async function getBlockchain() {
    const response = await request
        .get(`${process.env.BLOCKCHAIN_URL}/api/blocks`);
    return response ? response.body : [];
}

export async function addBlock(data) {
    const response = await request
        .post(`${process.env.BLOCKCHAIN_URL}/api/blocks`)
        .send(data);
    return true;
}
