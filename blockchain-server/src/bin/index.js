#!/usr/bin/env node

/**
 * Module dependencies.
 */

import { HttpServer, P2pServer } from '../servers';
import _debug from 'debug';
import { Blockchain } from "../blockchain";
import { config } from '../config/config';

const debug = _debug('blockchain:bin');

/**
 * Get port from environment and store in Express.
 */
// TODO: get args appropriately
const httpPort = process.env.HTTP_PORT || config.httpPort || '3001';
const p2pPort  = process.env.WS_PORT || config.wsPort || '5001';
const httpAddress = null;
const p2pAddress = null;
const peers = null;

/**
 * Create blockchain and give to the request handler (app)
 *   and P2pServer
 */
debug("Instantiating blockchain and servers");
const blockchain = new Blockchain();
const httpServer = new HttpServer(blockchain, httpPort, httpAddress);
const p2pServer = new P2pServer(blockchain, p2pPort, p2pAddress, peers);

/**
 * Start the api and the peer-to-peer connection
 */
httpServer.listen();
p2pServer.listen();


