import {Blockchain} from "../src/blockchain/blockchain";
import {createTestBlockchain} from "./utilities";

const jest = require('jest');

test("should start with a genesis block", () => {
    const chain = new Blockchain();
    expect(chain.chain.length).toBe(1);
    const genesis = chain.chain[0];
    expect(genesis.data).toBe("Genesis");
});

test("should add blocks", () => {
    const length = 10;
    const difficulty = 3;
    const chain = createTestBlockchain(length, difficulty);
    expect(chain.chain.length).toBe(length);

});

test("chain's hash should meet difficulty requirement", () => {
    const length = 10;
    const difficulty = 3;
    const chain = createTestBlockchain(length, difficulty);
    for (let i = 0; i < length; i++) {
        // TODO: fill in
    }
});