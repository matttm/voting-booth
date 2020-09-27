import express from "express";
import supertest from "supertest";
import * as fs from 'fs';

export const initRoute = (router) => {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(router);
    app.listen(3000);
    return supertest(app);
};

export function getTestBlockchain() {
    let chain = fs.readFileSync('test/test-block.json');
    let votes = fs.readFileSync('test/test-block-data.json');
    chain = JSON.parse(chain);
    votes = JSON.parse(votes);
    for (let i = 1; i < chain.length; i++) {
        chain[i].data = votes[i - 1];
    }
    return chain;
}

function handle(promise) {
    return promise
        .then(data => ([data, undefined]))
        .error(err => Promise.resolve([undefined, err]));
}
