import WebSocket from "ws";
import {normalizePort, onListening, onError} from "../utilities";

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

    subscribeBlockchainEvents() {
        this.blockchain.emitter.on('blockAdded', () => null);
        this.blockchain.emitter.on('blockchainReplaced', () => null);
    }

    /**
     * Create the websocket app and listen on a given port
     */
    listen() {
        this.server = new WebSocket.Server({ port: this.port, host: this.host });

        const server = this.server;
        server.on('error', error => onError(this.port));
        // TODO: fix event listener
        console.log('Listening on ' + this.port);
        //server.on('listening', onListening(server));
        server.on('connection', socket => this.connect(socket));

        this.connectToPeers();
    }

    /**
     * Connect to a socket
     * @param socket the socket that's connecting
     */
    connect(socket) {
        this.sockets.push(socket);
        console.log('Socket connected');

        socket.on('message', message => P2pServer.onMessage(message));

        P2pServer.sendJsonMessage(socket, this.blockchain.chain)
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
     */
    connectToPeers() {
        console.log('peers: ' + this.peers);
        this.peers.forEach(peer => {
            const socket = new WebSocket(peer);
            socket.on('open', () => this.connect(socket));
        })
    }

    /***
     * Given a socket, a message will be sent to that client
     * after being turned to JSON
     * @param socket the sock that's sending the message
     * @param message the message to be sent as JSON
     */
    static sendJsonMessage(socket, message) {
        socket.send(JSON.stringify(message));
    }
}
