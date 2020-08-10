#!/usr/bin/env node

/**
 * Module dependencies.
 */

import { app, P2pServer} from '../server';
import _debug from 'debug';
import http from 'http';
import {Blockchain} from "../blockchain";
import { config } from '../config/config';

const p2p = new P2pServer();
const debug = _debug('blockchain:server');

/**
 * Get port from environment and store in Express.
 */
const httpPort = normalizePort(process.env.HTTP_PORT || config.httpPort || '3000');
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
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(httpPort);
p2p.listen(wsPort,
    process.env.PEERS.split(',') || config.peers || []);

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

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
