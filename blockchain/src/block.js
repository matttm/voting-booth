const sha256 = require('js-sha256');

/**
 * Class Block represents a single block in the blockchain. A block is to
 *  contain an index (where this block is in the chain), a hash of this block
 *  and a hash of the previous block, a timestamp, , difficulty, nonce, and a datum/data.
 */
export class Block {

    constructor(prevHash, data, timestamp, difficulty) {
        this.hash = generateHash();
        this.prevHash = prevHash;
        this.timestamp = timestamp;
        this.data = data;
        this.difficulty = difficulty;
        this.nonce = 0;
    }
}

/**
 * Override of the toString function
 *
 * @returns {string} string representation of the block
 */
Block.prototype.toString = (index) => {
    return `Block ${index} ${this.timestamp} ${this.hash}`;
};

/**
 * Encrypt this block using a SHA256 encryption
 *
 * @returns a string representing a 256-bit encryption
 */
function generateHash() {
    return sha256.sha256(
        this.prevHash +
        this.timestamp +
        this.data +
        this.difficulty +
        this.nonce
    ).toString();
}

/**
 * Generate a genesis block, which is a first block in
 * a blockchain
 *
 * @returns {Block} the genesis block
 */
export function genesisBlock() {
    return new Block(null, "Genesis", Date.now());
}