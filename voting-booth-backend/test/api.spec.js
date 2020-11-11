import apiRouter from '../src/server/routes/api';
import * as authservice from '../src/server/services/authentication-service';
import * as bcservice from '../src/server/services/blockchain-service';
import {getTestBlockchain, initRoute} from "./test-utilities";

describe('Testing API', () => {
    const testChain = getTestBlockchain();
    const promisedChain = Promise.resolve(testChain);
    const promisedTrue  = Promise.resolve(true);
    const promisedFalse = Promise.resolve(false);
    let request;
    const testPerson = {
        fname: "Testy",
        lname: "Test",
        zip: "13363",
        ssn: "290-90-7777"
    };

    beforeAll(() =>{
        request = initRoute(apiRouter);
    });

    test('should receive a 401 status when logging in', async () => {
        const spy = jest.spyOn(authservice, 'authenticate');
        spy.mockReturnValue(promisedFalse);
        const response = await request
            .post('/login')
            .send(testPerson);
        expect(response.status).toBe(401);
        expect(response.text).toBe('The provided credentials do not match a record');
        spy.mockRestore();
    });

    test('should receive a valid JWT when logging in', async () => {
        const spy = jest.spyOn(authservice, 'authenticate');
        spy.mockReturnValue(promisedTrue);
        const response = await request
            .post('/login')
            .send(testPerson);
        expect(response.status).toBe(200);
        const { idToken, expiresIn} = response.body;

        // ensure token is a valid bearer token
        const jwt = idToken.split(' ');
        expect(jwt).toBeTruthy();
        expect(expiresIn).toBeTruthy();
        spy.mockRestore();
    });

    test('should return status 200 because of an authentic jwt', async () => {
        const spy = jest.spyOn(authservice, 'authenticate');
        spy.mockReturnValue(promisedTrue);
        let response = await request
            .post('/login')
            .send(testPerson);
        expect(response.status).toBe(200);
        const { idToken } = response.body;

        response = await request
            .get('/authentic')
            .set('Authorization', `Bearer ${idToken}`)
            .send();
        expect(response.status).toBe(200);
    });

    it('should return status 401 because of an inauthentic jwt', async () => {
        const response = await request
            .get('/authentic')
            .set('Authorization', 'invalidtoken')
            .send();
        expect(response.status).toBe(401);
    });

    it('should convert blockchain to results map', async () => {
        const chain = testChain;
        const spy = jest.spyOn(bcservice, 'getBlockchain');
        spy.mockReturnValue(promisedChain);
        const response = await request
            .get('/results')
            .send();
        expect(response.status).toBe(200);
        expect(response.body.success).toBeTruthy();
        expect(response.body.results).toBeTruthy();
        let results = new Map(response.body.results);
        expect(results.get('Joe Biden')).toBe(3);
        expect(results.get('Donald Trump')).toBe(4);
        expect(results.get('Jo Jorgensen')).toBe(2);
        spy.mockRestore();
    });

    it('should return 401 without an id', async () => {
        const chain = testChain;
        const bcSpy = jest.spyOn(bcservice, 'getBlockchain');
        bcSpy.mockReturnValue(promisedChain);

        const response = await request
            .get('/user?voted=true')
            .send();
        expect(response.status).toBe(401);
        bcSpy.mockRestore();
    });

    it('should determine person HAS voted', async () => {
        const chain = testChain;
        const authSpy = jest.spyOn(authservice, 'authenticate');
        const bcSpy = jest.spyOn(bcservice, 'hasVoted');
        authSpy.mockReturnValue(promisedTrue);
        bcSpy.mockReturnValue(promisedTrue);

        let response = await request
            .post('/login')
            .send(testPerson);
        expect(response.status).toBe(200);
        const { idToken } = response.body;

        response = await request
            .get('/user?voted=true')
            .set('Authorization', `Bearer ${idToken}`)
            .send();
        expect(response.status).toBe(200);
        expect(response.body.success).toBeTruthy();
        expect(response.body.hasVoted).toBeTruthy();
        bcSpy.mockRestore();
    });

    it('should succeed in voting', async () => {
        const vote = {
            candidate: 'Tulsi Gabbard'
        };
        const res = {
            success: true,
            message: 'Block added'
        };
        const authSpy = jest.spyOn(authservice, 'authenticate');
        const bcSpy = jest.spyOn(bcservice, 'addBlock');
        authSpy.mockReturnValue(promisedTrue);
        bcSpy.mockReturnValue(Promise.resolve(res));

        let response = await request
            .post('/login')
            .send(testPerson);
        expect(response.status).toBe(200);
        const { idToken } = response.body;

        response = await request
            .post('/votes')
            .set('Authorization', `Bearer ${idToken}`)
            .send(vote);
        expect(response.status).toBe(200);
        expect(response.body.success).toBeTruthy();
        bcSpy.mockRestore();
    });
});
