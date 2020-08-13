import { sha256 } from 'js-sha256';

/**
 * Class Block represents a single block in the blockchain. A block is to
 *  contain an index (where this block is in the chain), a hash of this block
 *  and a hash of the previous block, a timestamp, , difficulty, nonce, and a datum/data.
 */
export class Block {
// TODO: determine best practice for static methods vs functions
//   and then fix modularity
    constructor(prevHash, data, timestamp, difficulty) {
        this.prevHash = prevHash;
        this.timestamp = timestamp;
        this.data = data;
        this.difficulty = difficulty;
        this.generateValidHash();
    }

    /**
     * Determine if new block is valid
     * @param prevBlock the most recently added block to the blockchain
     *
     * @returns {boolean} true iff the block is valid
     */
    isValidBlock(prevBlock) {
        const hash = this.hash;

        if (this.prevHash !== prevBlock.hash) {
            console.log(`Block ${this.timestamp} rejected: new hash does not match previous`);
            return false;
        } else if (!Block.isHashValid(hash, this.difficulty)) {
            console.log(`Block ${this.timestamp} rejected: new hash does match block's difficulty`);
            return false;
        }
        return true;
    }

    /**
     * Generates a hash that matches the block's difficulty
     *   and assigns it to the block's members
     */
    generateValidHash() {
        let hash = '';
        let nonce = 0;
        const diff = this.difficulty;
        while (!Block.isHashValid(hash, diff)) {
            hash = this.generateHash(nonce);
            nonce++;
        }
        this.hash = hash;
        this.nonce = nonce - 1;
    }
    /**
     * Determines whether the given hash is valid according to the difficulty
     * @param hash the hash that is TBD whether it is valid/invalid
     * @param difficulty the difficult level of the mining effort
     *
     * @returns {boolean} true iff the hash is valid
     */
    static isHashValid(hash, difficulty) {
        const prefix = '0'.repeat(difficulty);
        return hash.startsWith(prefix);
    }

    /**
     * Encrypt this block using a SHA256 encryption
     * @param nonce the block's "nonce" which is used
     *   to manipulate the hash to match a difficulty
     *
     * @returns a string representing a 256-bit encryption
     */
    generateHash(nonce) {
        return sha256(
            this.prevHash +
            this.timestamp +
            this.data +
            this.difficulty +
            nonce
        ).toString();
    }
}

/**
 * Override of the toString function
 *
 * @returns {string} string representation of the block
 */
Block.prototype.toString = () => {
    return `[Block] ${this.timestamp} ${this.hash}`;
};
