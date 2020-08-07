import {Blockchain} from "../src/blockchain/blockchain";
import {createTestBlockchain} from "./utilities";
import {Block} from "../src/blockchain/block";

test("should start with a genesis block", () => {
    const chain = new Blockchain().chain;
    expect(chain.length).toBe(1);
    const genesis = chain[0];
    expect(chain.length).toBe(1);
    expect(genesis.data).toBe("Genesis");
});

test('should get the latest block', () => {
    const chain = new Blockchain();
    const genesis = chain.chain[0];
    const tmp = new Block(genesis.hash, 'test', Date.now(), 3);
    chain.chain.push(tmp);
    expect(chain.getLatestBlock().hash).toBe(tmp.hash);
    expect(chain.getLatestBlock().timestamp).toBe(tmp.timestamp);
});

test("should add blocks", () => {
    const length = 10;
    const difficulty = 3;
    const chain = createTestBlockchain(length, difficulty).chain;
    expect(chain.length).toBe(length);
});

test("chain's hash should meet difficulty requirement", () => {
    const length = 10;
    const difficulty = 3;
    const chain = createTestBlockchain(length, difficulty).chain;
    for (let i = 0; i < length; i++) {
        const block = chain[i];
        const prefix = '0'.repeat(difficulty);
        expect(block.hash.startsWith(prefix)).toBeTruthy();
    }
});

test("prevHash of current block is the hash of previous block", () => {
    const length = 10;
    const difficulty = 3;
    const chain = createTestBlockchain(length, difficulty);
    for (let i = 0; i < length; i++) {
        const prev = chain[i - 1];
        const curr = chain[i];
        expect(prev.hash).toBe(curr.prevHash);
    }
});