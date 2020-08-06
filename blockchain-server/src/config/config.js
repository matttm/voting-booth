/**
 * Everything used in configuration of the blockchain
 * @type {{ address: string, peers: array}}
 *  - address - blockchain server address to use
 *  - peers - other blockchain servers to connect to
 */
const config = {};

config.address = 'https://localhost:3000';
config.peers = [
    'https://localhost:3000'
];

module.exports = config;