const sha256 = require('js-sha256');

/**
 * Class Block represents a single block in the blockchain. A block is to
 *  contain an index (where this block is in the chain), a hash of this block
 *  and a hash of the previous block, a timestamp, and a datum/data.
 */
export default class Block {

    constructor(index, prevHash, data, timestamp) {
        this.index = index;
        this.hash = generateHash();
        this.prevHash = prevHash;
        this.timestamp = timestamp;
        this.data = data;
    }
}

/**
 * Encrypt this block using a SHA256 encryption
 *
 * @returns a string representing a 256-bit encryption
 */
function generateHash() {
    return sha256.sha256(
        this.index +
        this.prevHash +
        this.timestamp +
        this.data
    ).toString();
}
