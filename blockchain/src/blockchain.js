import {Block, genesisBlock} from "./block";

class Blockchain {

    constructor() {
        this.chain = [genesisBlock()];
    }

    addBlock(prevHash, data, timestamp, difficulty) {
        this.chain.push(
            new Block(prevHash, data, timestamp, difficulty)
        )
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