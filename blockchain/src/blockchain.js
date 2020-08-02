import {Block, genesisBlock} from "./block";

class Blockchain {

    constructor() {
        this.chain = [genesisBlock()];
    }

    addBlock(data) {
        const lastBlock = this.getLatestBlock();
        this.chain.push(
            new Block(
                lastBlock.prevHash,
                data,
                lastBlock.timestamp,
                lastBlock.difficulty)
        )
    }

    getLatestBlock() {
        return this.chain[this.chain.length() - 1];
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