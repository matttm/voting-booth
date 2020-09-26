import {Blockchain, Block} from "../src/blockchain";
import {createTestBlockchain} from "./utilities";

describe('Blockchain Tests', () => {

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

    test("timestamps are valid", () => {
        const length = 10;
        const difficulty = 3;
        const chain = createTestBlockchain(length, difficulty).chain;
        for (let i = 0; i < length; i++) {
            const block = chain[i];
            expect(block.timestamp).toBeTruthy();
        }
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
        const chain = createTestBlockchain(length, difficulty).chain;
        for (let i = 1; i < length; i++) {
            const prev = chain[i - 1];
            const curr = chain[i];
            expect(prev.hash).toBe(curr.prevHash);
        }
    });

    test("should be a valid chain", () => {
        const length = 10;
        const difficulty = 3;
        const chain = createTestBlockchain(length, difficulty);
        expect(Blockchain.isValidChain(chain.chain)).toBeTruthy();
    });

    test("should be an invalid chain", () => {
        const length = 10;
        const difficulty = 3;
        const chain = createTestBlockchain(length, difficulty);
        // messing up chain
        chain.chain[2].prevHash = "13373";
        expect(Blockchain.isValidChain(chain.chain)).toBeFalsy();
    });

    test("should accept new chain", () => {
        // this test is based on longer chain consensus algorithm
        const length1 = 10;
        const length2 = 11;
        const difficulty = 3;
        const chain1 = createTestBlockchain(length1, difficulty);
        const chain2 = createTestBlockchain(length2, difficulty);
        chain1.replaceChain(chain2.chain);
        expect(chain1.chain).toBe(chain2.chain);
        expect(chain1.chain.length).toBe(length2);
    });

    test("should not accept new chain", () => {
        // this test is based on longer chain consensus algorithm
        const length1 = 10;
        const length2 = 5;
        const difficulty = 3;
        const chain1 = createTestBlockchain(length1, difficulty);
        const chain2 = createTestBlockchain(length2, difficulty);
        const _chain1 = chain1.chain;
        chain1.replaceChain(chain2.chain);
        expect(chain1.chain).toBe(_chain1);
        expect(chain1.chain.length).toBe(length1);
    });

    test("should not accept new chain due to it being invalid", () => {
        // this test is based on longer chain consensus algorithm
        const length1 = 10;
        const length2 = 15;
        const difficulty = 3;
        const chain1 = createTestBlockchain(length1, difficulty);
        const chain2 = createTestBlockchain(length2, difficulty);
        const _chain1 = chain1.chain;
        chain2.chain[2].hash = "13373";
        chain1.replaceChain(chain2.chain);
        expect(chain1.chain).toBe(_chain1);
        expect(chain1.chain.length).toBe(length1);
    });

    test("should not accept new chain with same size", () => {
        // this test is based on longer chain consensus algorithm
        const length = 10;
        const difficulty = 3;
        const chain1 = createTestBlockchain(length, difficulty);
        const chain2 = createTestBlockchain(length, difficulty);
        const _chain1 = chain1.chain;
        chain1.replaceChain(chain2.chain);
        expect(chain1.chain).toBe(_chain1);
    });
});
