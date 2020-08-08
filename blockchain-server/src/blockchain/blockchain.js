import {Block} from "./block";

export class Blockchain {

    constructor() {
        this.chain = [genesisBlock()];
    }

    /**
     * Adds a new block to the blockchain
     * @param data the information that the block is to contain
     */
    addBlock(data) {
        // There should always be a first block because
        //   of the genesis block
        const lastBlock = this.getLatestBlock();
        this.chain.push(
            new Block(
                lastBlock.hash,
                data,
                Date.now(),
                lastBlock.difficulty
            )
        )
    }

    /**
     * Determines whether or not to replace chain and does so
     * @param newChain the newChain, to possibly replace the old chain
     */
    replaceChain(newChain) {
        if (!Blockchain.isValidChain(newChain)) {
            console.log("New chain rejected: new chain is invalid");
            return;
        } else if (this.chain.length >= newChain.length) {
            console.log("New chain rejected: current chain is longer");
            return;
        }
        this.chain = newChain;
        console.log("New chain accepted");
    }

    /**
     * Determine whether an entire chain is valid
     * @param _chain the chain of a Blockchain object
     *
     * @returns {boolean} true iff every block in the chain is valid
     */
    static isValidChain(_chain) {
        const chain = _chain;

        // TODO: validate genesis
        // this loop verifies all blocks after genesis block
        for (let i = 1; i < chain.length; i++) {
            if (!chain[i].isValidBlock(chain[i-1])) {
                return false;
            }
        }
        return true;
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
    return new Block('0'.repeat(64), "Genesis", Date.now(), 3);
}