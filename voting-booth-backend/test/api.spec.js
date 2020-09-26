import apiRouter from '../src/server/routes/api';
import * as authservice from '../src/server/services/authentication-service';
import * as bcservice from '../src/server/services/blockchain-service';
import {getTestBlockchain, initRoute} from "./utilities";

describe('Testing API', () => {
    const testChain = getTestBlockchain();
    let request;
    const testPerson = {
        fname: "Testy",
        lname: "Test",
        zip: "13363",
        ssn: "290907777"
    };

    beforeAll(() =>{
        request = initRoute(apiRouter);
    });

    test('should receive a 401 status when logging in', async () => {
        const spy = jest.spyOn(authservice, 'authenticate');
        spy.mockReturnValue(false);
        const response = await request
            .get('/login')
            .send(testPerson);
        expect(response.status).toBe(401);
        expect(response.text).toBe('The provided credentials do not match a record');
        spy.mockRestore();
    });

    test('should receive a valid JWT when logging in', async () => {
        const spy = jest.spyOn(authservice, 'authenticate');
        spy.mockReturnValue(true);
        const response = await request
            .get('/login')
            .send(testPerson);
        expect(response.status).toBe(200);
        const { idToken, expiresIn} = response.body;

        // ensure token is a valid bearer token
        const [prefix, jwt] = idToken.split(' ');
        expect(prefix).toBe('Bearer');
        expect(jwt).toBeTruthy();
        expect(expiresIn).toBeTruthy();
        spy.mockRestore();
    });

    test('should return status 200 because of an authentic jwt', async () => {
        const spy = jest.spyOn(authservice, 'authenticate');
        spy.mockReturnValue(true);
        let response = await request
            .get('/login')
            .send(testPerson);
        expect(response.status).toBe(200);
        const { idToken } = response.body;

        response = await request
            .get('/authentic')
            .set('Authorization', idToken)
            .send();
        expect(response.status).toBe(200);
    });

    test('should return status 401 because of an inauthentic jwt', async () => {
        const response = await request
            .get('/authentic')
            .set('Authorization', 'invalidtoken')
            .send();
        expect(response.status).toBe(401);
    });

    it('should convert blockchain to results map', async () => {
        const chain = testChain;
        const spy = jest.spyOn(bcservice, 'getBlockchain');
        spy.mockReturnValue(chain);
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
    })
});
