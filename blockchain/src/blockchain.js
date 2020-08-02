import {Block} from "./block";

class Blockchain {

    constructor() {
        this.chain = [genesisBlock()];
    }

    /**
     * Adds a new block to the blockchain
     * @param data the information that the block is to contain
     */
    addBlock(data) {
        const lastBlock = this.getLatestBlock();
        this.chain.push(
            new Block(
                lastBlock.prevHash,
                data,
                Date.now(),
                lastBlock.difficulty)
        )
    }

    /**
     * Get the latest block in the blockchain
     * @returns {Block} latest block in the blockchain
     */
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }
}

/**
 * Override of the blockchain's toString function
 *
 * @returns {string} string representation of the blockchain
 */
Blockchain.prototype.toString = () => {
    for (let block of this.chain) {
        console.log(block);
    }
};

/**
 * Generate a genesis block, which is a first block in
 * a blockchain
 *
 * @returns {Block} the genesis block
 */
function genesisBlock() {
    return new Block(null, "Genesis", Date.now());
}