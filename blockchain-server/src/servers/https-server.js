import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import { IndexRouter } from './routers';
import { ApiRouter } from './routers/api';
import {onListening, onError, normalizePort} from "../utilities";
import fs from "fs";
import https from "https";

/**
 * This class is a container for an express app
 * that will be used to host endpoints for an api to
 * the blockchain.
 */
export class HttpsServer {
    constructor(blockchain, host, port) {
        this.host = host;
        this.port = normalizePort(port);
        this.blockchain = blockchain;
        this.server = this.createServer(this.createRequestListener());
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

        app.use('/', IndexRouter());
        app.use('/api', ApiRouter(this.blockchain));
        return app;
    }

    /**
     * Creates a server and assigns callbacks for
     * 'error' and 'listening' events
     * @param app a request listener
     * @returns {*} an configured http server
     */
    createServer(app) {
        const certFile = path.resolve(process.cwd(), `../certificate`);
        const key = fs.readFileSync(`${certFile}.key`);
        const cert = fs.readFileSync(`${certFile}.crt`);
        const server = https.createServer({key: key, cert: cert }, app);
        server.on('error', onError(this.port));
        server.on('listening', onListening(server));
        return server;
    }

    /**
     * Start listening on host:port
     */
    listen() {
        this.server.listen(this.port, this.host);
    }
}
