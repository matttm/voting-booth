#!/usr/bin/env node

/**
 * Module dependencies.
 */
// import pkg from '../../../package.json';
// import * as greensock from 'greenlock-express';
import app   from '../app';
import debug from 'debug';
import https  from 'https';
import fs from 'fs';
import path from 'path';

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */
const certFile = path.resolve(process.cwd(), `./certificate`);
const key = fs.readFileSync(`${certFile}.key`);
const cert = fs.readFileSync(`${certFile}.crt`);
const server = https.createServer({key: key, cert: cert }, app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
// greensock
//     .init({
//       // where to find .greenlockrc and set default paths
//       packageRoot: __dirname,
//
//       // where config and certificate stuff go
//       configDir: "../../../greenlock.d",
//
//       // contact for security and critical bug notices
//       maintainerEmail: 'matttmaloney@gmail.comm',
//
//       // name & version for ACME client user agent
//       packageAgent: 'test/test',  // pkg.name + "/" + pkg.version,
//
//       // whether or not to run at cloudscale
//       cluster: false
//     })
//     .serve(app);
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

  const  bind = typeof port === 'string'
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
  console.log('Listening on ' + bind);
}
