/**
 * Everything used in configuration of the blockchain
 * @type {{ address: string, peers: array, http_port: number, p2p_port: number}}
 *  - address - blockchain app address to use
 *  - peers - other blockchain servers to connect to
 */
export const config = {};

//config.address = 'https://localhost:3000';
//config.peers = [
//    'https://localhost:3000'
//];
config.http_port = 3001;
config.p2p_port = 5001;
