import express from "express";
import supertest from "supertest";
import * as fs from 'fs';

/**
 * Enables an Express controller for testing
 *
 * @param router an Express router
 * @return {supertest.SuperTest<supertest.Test>} a supertest object
 */
export const initRoute = (router) => {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(router);
    app.listen(3000);
    return supertest(app);
};

/**
 * Loads a blockchain with a vote object as the value for data property
 *
 * @return {any | Buffer} a blockchain
 */
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
