import {Block} from "../src/blockchain";

describe('tests for a block', () => {

    const prevHash = '000764683',
        data = 'Test me',
        timestamp = '11/21/23',
        difficulty = 3;
    let block;

    beforeEach(() => {
        block = new Block(prevHash, data, timestamp, difficulty);
    });

    test('should be a valid hash', () => {
        const hash = '0'.repeat(difficulty) + '1'.repeat(64 - difficulty);
        expect(Block.isHashValid(hash, difficulty)).toBeTruthy();
    });

    test('should be an invalid hash', () => {
        const newDiff = difficulty - 1;
        const hash = '0'.repeat(newDiff) + '1'.repeat(64 - newDiff);
        expect(Block.isHashValid(hash, difficulty)).toBeFalsy();
    });

    test('should create a block', () => {
        expect(block.prevHash).toBe(prevHash);
        expect(block.data).toBe(data);
        expect(block.timestamp).toBe(timestamp);
        expect(block.difficulty).toBe(difficulty);
    });

    test('should be a valid block', () => {
        expect(block.isValidBlock(prevHash)).toBeTruthy();
    });

    test('should be an invalid block because of data tampering', () => {
        block.data = 'Tamper tamper';
        expect(block.isValidBlock(prevHash)).toBeFalsy();
    });

    test('should be an invalid block due to new hash having ' +
        'improper difficulty', () => {
        block.hash = '1'.repeat(64);
        expect(block.isValidBlock(prevHash)).toBeFalsy();
    });

    test('should be an invalid block due to previous hashes not matching', () => {
        block.prevHash = '3453';
        expect(block.isValidBlock(prevHash)).toBeFalsy();
    })
});