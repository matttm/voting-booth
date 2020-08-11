/**
 * Event listener for HTTP app "error" event.
 * @param port the port being listened on
 *
 * @return an error callback
 */
export function onError(port) {
    return (error) => {
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
}

/**
 * Event listener for HTTP app "listening" event.
 * @param server the app being listened to
 *
 * @return a listening callback
 */
export function onListening(server) {
    return () => {
        const addr = server.address();
        const bind = typeof addr === 'string'
            ? 'pipe ' + addr
            : 'port ' + addr.port;
        debug('Listening on ' + bind);
        console.log('Listening on ' + bind);
    }
}

/**
* Normalize a port into a number, string, or false.
*/
export function normalizePort(val) {
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