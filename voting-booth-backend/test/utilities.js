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
    const chain = fs.readFileSync('test-block.json');
    console.log(chain);
}
