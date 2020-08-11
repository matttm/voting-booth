import http from 'http';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import { IndexRouter } from './routers';
import { ApiRouter } from './routers/api';
import {onListening} from "./utilities";

/**
 * This class is a container for an express app
 * that will be used to host endpoints for an api to
 * the blockchain.
 */
export class HttpServer {
    constructor(blockchain, host, port) {
        this.host = host;
        this.port = port;
        this.blockchain = blockchain;
        let app = this.createRequestListener();
        this.server = http.createServer(app);
    }

    /**
     * Create a request listener for a http sever
     */
    createRequestListener() {
        const app = express();
        app.use(logger('dev'));
        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));
        app.use(cookieParser());
        app.use(express.static(path.join(__dirname, 'public')));

        app.use('/', new IndexRouter());
        app.use('/api', new ApiRouter(this.blockchain));
        return app;
    }

    /**
     * Start listening on host:port
     */
    listen() {
        const server = this.server;
        server.listen(this.port, this.host, onListening(server));
    }
}