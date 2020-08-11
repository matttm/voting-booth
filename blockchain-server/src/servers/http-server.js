import http from 'http';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import { IndexRouter } from './routers';
import { ApiRouter } from './routers/api';
import {onListening, onError, normalizePort} from "./utilities";

/**
 * This class is a container for an express app
 * that will be used to host endpoints for an api to
 * the blockchain.
 */
export class HttpServer {
    constructor(blockchain, host, port) {
        this.host = host;
        this.port = normalizePort(port);
        this.blockchain = blockchain;
        this.server = HttpServer.createServer(this.createRequestListener());
    }

    /**
     * Create a request listener for a http sever, configured
     * with a logger and json middleware
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
     * Creates a server and assigns callbacks for
     * 'error' and 'listening' events
     * @param app a request listener
     * @returns {*} an configured http server
     */
    static createServer(app) {
        const server = http.createServer(app);
        server.on('error', onError);
        server.on('listening', onListening);
        return server;
    }

    /**
     * Start listening on host:port
     */
    listen() {
        this.server.listen(this.port, this.host);
    }
}