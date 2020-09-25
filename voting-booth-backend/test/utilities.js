import express from "express";
import supertest from "supertest";

export const initRoute = (router) => {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(router);
    app.listen(3000);
    return supertest(app);
};

export function getTestBlockchain() {

}
