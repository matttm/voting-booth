/**
 * Determine if new block is valid
 * @param newBlock the block whose validity is TBD
 * @param latestBlock the most recently added block to the blockchain
 *
 * @returns {boolean} true iff the block is valid
 */
function isBlockValid(newBlock, latestBlock) {
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