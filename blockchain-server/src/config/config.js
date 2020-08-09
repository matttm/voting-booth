/**
 * Everything used in configuration of the blockchain
 * @type {{ address: string, peers: array, httpPort: number, wsPort: number}}
 *  - address - blockchain server address to use
 *  - peers - other blockchain servers to onConnect to
 */
export const config = {};

config.address = 'https://localhost:3000';
config.peers = [
    'https://localhost:3000'
];
config.httpPort = 3001;
config.wsPort = 5001;