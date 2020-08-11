#!/usr/bin/env node

/**
 * Module dependencies.
 */

import { HttpServer, P2pServer} from '../servers';
import _debug from 'debug';
import http from 'http';
import {Blockchain} from "../blockchain";
import { config } from '../config/config';

const p2p = new P2pServer();
const debug = _debug('blockchain:app');

/**
 * Get port from environment and store in Express.
 */
const httpPort = normalizePort(process.env.HTTP_PORT || config.httpPort || '3001');
const wsPort   = normalizePort(process.env.WS_PORT || config.wsPort || '5001');
app.set('port', httpPort);

/**
 * Create blockchain and give to the request handler (app)
 *   and P2pServer
 */
// TODO: is this method for passing the chain appropriate?
const blockchain = new Blockchain();
p2p.set('blockchain', blockchain);
app.set('blockchain', blockchain);


/**
 * Create HTTP app.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(httpPort);
p2p.listen(wsPort,
    process.env.PEERS ? process.env.PEERS.split(',') :config.peers || []);

// TODO: make runnning multiple instances locally, friendlier

server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

