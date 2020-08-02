/**
 * Determine if new block is valid
 * @param newBlock the block whose validity is TBD
 * @param latestBlock the most recently added block to the blockchain
 *
 * @returns {boolean} true iff the block is valid
 */
function isValidBlock(newBlock, latestBlock) {
    const hash = newBlock.hash;

    if (hash === latestBlock.hash) {
        console.log(`Block ${newBlock.timestamp} rejected: new hash does not match previous`);
        return false;
    } else if (newBlock.isHashValid(hash)) {
        console.log(`Block ${newBlock.timestamp} rejected: new hash does match block's difficulty`);
        return false;
    }
    return true;
}

/**
 * Determine whether an entire chain is valid
 * @param blockchain a blockchain object to be validated
 *
 * @returns {boolean} true iff every block in the chain is valid
 */
function isValidChain(blockchain) {
    const chain = blockchain.chain;

    // TODO: validate genesis
    // this loop verifies all blocks after genesis block
    for (let i = 1; i < chain.length; i++) {
        if (!isValidBlock(chain[i], chain[i-1])) {
            return false;
        }
    }
    return true;
}