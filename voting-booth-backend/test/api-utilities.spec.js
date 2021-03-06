import {hasVoted} from "../src/server/utilities";
import {getTestBlockchain} from "./test-utilities";

/**
 * Test for api-utilities
 **/

describe('api-utilities', () => {

    const testChain = getTestBlockchain();

    it('should determine a user to have voted', async () => {
        const voter = {
            "fname":"Testy",
            "lname": "Test",
            "zip": "13363",
            "ssn": "290-90-7777"
        };
        const answer = hasVoted(testChain, voter);
        expect(answer).toBeTruthy();
    });

    it('should determine a user to have not voted', async () => {
        const voter = {
            "fname":"Testy",
            "lname": "Novote",
            "zip": "13363",
            "ssn": "290-90-7777"
        };
        const answer = hasVoted(testChain, voter);
        expect(answer).toBeFalsy();
    });
});


