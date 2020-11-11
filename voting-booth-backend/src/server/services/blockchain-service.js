import request from "superagent";
import {handle} from "../utilities";

/**
 * Get the blockchain from the blockchain network
 *
 * @return {Promise<[]>} a chain of blocks containing vote data
 */
export async function getBlockchain() {
    const response = await request
        .get(`${process.env.BLOCKCHAIN_URL}/api/blocks`);

    return response.body?.chain;
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
        .send({ data });

    return response.body?.success;
}

/**
 * Check whether a user has voted or not according to expected
 *
 * @param user the user being tested
 * @param expected the value of voting being tested for
 *   i.e. true iff testing whether user HAS voted
 *        false iff testing whether user HAS NOT voted
 * @return {Promise<*|boolean>} boolean determining whether user has voted
 */
export async function hasVoted(user, expected) {
    const [chain, err] = await handle(getBlockchain());
    if (err) {
        throw new Error('Unable to get blockchain');
    }
    // some returns true iff, an el meets the criteria
    const actual = chain.some((block, idx) => {
        if (idx === 0)
            return;
        const {voter} = block.data;
        return voter.fname === user.fname && voter.lname === user.lname && voter.zip === user.zip;
    });
    return actual === expected;
}
