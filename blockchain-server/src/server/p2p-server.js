import WebSocket from "ws";

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
     * @param peers array of websocket endpoints to connect to
     */
    listen(port, peers) {
        const server = WebSocket.Server({ port: port });

        server.on('connection', socket => this.connect(socket));

        // TODO: create way to initialize with peers
        this.connectToPeers(peers);
    }

    /**
     * Connect to a socket
     * @param socket the socket that's connecting
     */
    connect(socket) {
        this.sockets.push(socket);

        socket.on('message', message => P2pServer.onMessage(message));
    }

    /**
     * What to do when a watched socket receives a message event
     * @param message the message received from the message event
     */
    static onMessage(message) {
        const data = JSON.parse(message);
        console.log('data: ', data);
    }

    /**
     * Connect to array of websocket addresses
     * @param peers the  array of addresses
     */
    connectToPeers(peers) {
        peers.forEach(peer => {
            const socket = new WebSocket(peer);
            socket.on('open', () => this.connect(socket));
        })
    }
}