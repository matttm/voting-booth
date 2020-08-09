/**
 * This file will contain test utilities
 **/
import {Blockchain} from "../src/blockchain";

/**
 * Creates a Blockchain where there is len blocks,
 * each with difficulty diff and boring old test
 * data
 *
 * @param len length of the desired blockchain
 * @param diff difficulty of blocks
 *
 * @returns {Blockchain} a blockchain with ten blocks
 */
export function createTestBlockchain(len, diff) {
    const chain = new Blockchain();
    // The loop starts at one, so that with the genesis
    // block, the chain will be length len
    for (let i = 1; i < len; i++) {
        chain.addBlock(`Test Block ${i}`);
    }
    return chain;
}