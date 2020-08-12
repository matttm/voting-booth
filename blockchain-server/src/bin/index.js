#!/usr/bin/env node

/**
 * Module dependencies.
 */

import { HttpServer, P2pServer } from '../servers';
import _debug from 'debug';
import { Blockchain } from "../blockchain";
import { getEnvVar } from '../utilities';

const debug = _debug('blockchain:bin');

/**
 * Get port from environment and store in Express.
 */
// TODO: get args appropriately
const httpPort    = getEnvVar('http_port', '3001');
const p2pPort     = getEnvVar('p2p_port', '5001');
const httpAddress = getEnvVar('http_address', 'localhost');
const p2pAddress  = getEnvVar('p2p_addr', 'localhost');
const peers       = getEnvVar('peers', []);

/**
 * Create blockchain and give to the request handler (app)
 *   and P2pServer
 */
debug("Instantiating blockchain and servers");
const blockchain = new Blockchain();
const httpServer = new HttpServer(blockchain, httpAddress, httpPort);
const p2pServer = new P2pServer(blockchain, p2pAddress, p2pPort, peers);

/**
 * Start the api and the peer-to-peer connection
 */
httpServer.listen();
p2pServer.listen();


