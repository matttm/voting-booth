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

    beforeAll(() =>{
        request = initRoute(apiRouter);
    });

    test('should receive a 401 status when logging in', async done => {
        const spy = jest.spyOn(authservice, 'authenticate');
        spy.mockReturnValue(false);
        const response = await request
            .get('/login')
            .send({
                fname: "Testy",
                lname: "Test",
                zip: "13363",
                ssn: "290907777"
            });
        expect(response.status).toBe(401);
        expect(response.header['Content-Type']).toBe(/html/);
        expect(response.body).toBe('The provided credentials do not match a record');
        spy.mockRestore();
        done();
    })
});
