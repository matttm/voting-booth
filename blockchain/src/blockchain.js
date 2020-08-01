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