import request from 'supertest';
import {HttpServer} from "../src/servers";
import {Blockchain} from "../src/blockchain";

describe('http-server unit test', () => {
    // TODO: fill in test
    let server;

    beforeEach(() => {
        server = new HttpServer(
            new Blockchain()
            , 'localhost',
            '3001'
        ).server;
    });

    test('should get blocks', (done) => {
        request(server)
            .get('/api/blocks')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) throw err;
                expect(res).toBeTruthy();
                done();
            });
    });
});