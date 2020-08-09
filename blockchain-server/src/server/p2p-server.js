
export class P2pServer {
    constructor() {
        this.sockets = [];
    }

    /**
     * Set properties of the server
     * @param property the property to give the server
     * @param value the value of the property
     */
    set(property, value) {
        this[property] = value;
    }

    /**
     * Create the websocket server and listen on a given port
     * @param port the port to listen on
     */
    listen(port) {
        const server = WebSocket.Server({ port: port });

        server.on('connection', socket => this.onConnect(socket));

        // TODO: create way to initialize with peers
    }

    /**
     * What to do when the server receives a connection event
     * @param socket the socket that's connecting
     */
    onConnect(socket) {
        this.sockets.push(socket);

        socket.on('message', message => this.onMessage(message));
    }

    /**
     * What to do when a watched socket receives a message event
     * @param message the message received from the message event
     */
    onMessage(message) {

    }
}