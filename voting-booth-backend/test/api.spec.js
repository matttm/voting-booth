import express from 'express';
import supertest from 'supertest';
import apiRouter from '../src/server/routes/api';
import * as authservice from '../src/server/services/authentication-service';

const initRoute = (router) => {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(router);
    app.listen(3000);
    return supertest(app);
};

describe('Testing API', () => {
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
});
