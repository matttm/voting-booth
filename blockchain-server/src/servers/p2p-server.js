import WebSocket from "ws";
import {normalizePort} from "../utilities";

export class P2pServer {
    constructor(blockchain, host, port, peers) {
        this.blockchain = blockchain;
        this.host = host;
        this.port = normalizePort(port);
        this.peers = peers;
        this.sockets = [];
    }

    /**
     * Set properties of the app
     * @param property the property to give the app
     * @param value the value of the property
     */
    set(property, value) {
        this[property] = value;
    }

    /**
     * Create the websocket app and listen on a given port
     */
    listen() {
        const server = new WebSocket.Server({ port: this.port, host: this.host });
        console.log('Listening on ' + port);

        server.on('connection', socket => this.connect(socket));

        this.connectToPeers();
    }

    /**
     * Connect to a socket
     * @param socket the socket that's connecting
     */
    connect(socket) {
        this.sockets.push(socket);

        socket.on('message', message => P2pServer.onMessage(message));

        console.log('Socket connected');
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
        console.log('peers: ' + peers);
        peers.forEach(peer => {
            const socket = new WebSocket(peer);
            socket.on('open', () => this.connect(socket));
        })
    }
}
