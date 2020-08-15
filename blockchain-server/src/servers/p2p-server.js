import WebSocket from "ws";
import {normalizePort, onListening, onError} from "../utilities";
import {Message, MessageType} from "./message";

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
     * Set subscriber for all emitted blockchain events
     */
    subscribeBlockchainEvents() {
        this.blockchain.emitter.on('blockAdded', () => {
            this.broadcast(
                MessageType.ADD_BLOCK,
                this.blockchain.getLatestBlock()
            );
        });
        // TODO: keep this if api cannot replace chain?
        this.blockchain.emitter.on('blockchainReplaced', () => {
            this.broadcast(
                MessageType.CHAIN,
                this.blockchain.chain
            );
        });
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
        this.subscribeBlockchainEvents();
    }

    /**
     * Connect to a socket
     * @param socket the socket that's connecting
     */
    connect(socket) {
        this.sockets.push(socket);
        console.log(`${socket.remoteAddress} connected via WebSocket`);

        socket.on('message', message => this.onMessage(message));

        P2pServer.sendMessage(
            socket,
            // TODO: factor out message creation
            new Message(
                MessageType.CHAIN,
                this.blockchain.chain
            )
        );
    }

    /**
     * What to do when a watched socket receives a message event
     * @param message the message received from the message event
     */
    onMessage(message) {
        const data = JSON.parse(message);
        console.log('data: ', data);
        const type = data?.type;
        const psyload = data.payload;
        switch (type) {
            case MessageType.ADD_BLOCK:
                // TODO: how to add block?
                const block = data.payload;
                const success = this.blockchain.addConstructedBlock(block);
                if (!success) {
                    // TODO: SEND MESSAGE QUERYING ENTIRE CHAIN
                }
                break;
            case MessageType.CHAIN:
                const chain = data.payload;
                this.blockchain.replaceChain(chain);
                break;
            case MessageType.ADD_PEER:
                // TODO: find way to coordinate peers
                break;
            case MessageType.REQUEST_CHAIN:
                // TODO: send chain
                break;
            default:
                console.error('Unknown message type received');
        }
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
    static sendMessage(socket, message) {
        socket.send(JSON.stringify(message));
    }

    /**
     * Broadcasts a message to all connected peers
     * @param type the type of the message
     * @param payload info to be sent
     */
    broadcast(type, payload) {
        const message = new Message(type, payload);
        this.sockets.forEach(socket => {
            P2pServer.sendMessage(socket, message)
        });
    }
}
