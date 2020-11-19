// import {handle, hasVoted} from "../utilities";
// import {addBlock, getBlockchain} from "../services/blockchain-service";
const utils = require('../utilities');
const bcserv = require("../services/blockchain-service");
const hasVoted = utils.hasVoted;
const handle = utils.handle;
const addBlock = bcserv.addBlock;
const getBlockchain = bcserv.getBlockchain;
/**
 * File contains code that a child process will execute to
 * act as a failsafe if the blockchain server is temporarily down.
 * The failsafe is, if the blockchain server is unreachable, the vote
 * will be saved and will attempt sending at a later time.
 **/
process.on('message', async (message) => {
    console.log('Worker got a message');
    // TODO: check to ensure message is a vote
    const interval = setInterval(async () => {
        // TODO: send vote
        let [chain, err] = await handle(getBlockchain());
        if (err) {
            console.log('Fallback service failed to file vote')
        }
        // if user has already voted, reject
        if (hasVoted(chain, user, 'true')) {
            clearInterval(interval);
        }
        let status;
        [status, err] = await handle(addBlock(vote));
        if (err) {
            console.log('Fallback service failed to file vote')
        }
        if (status) {
            console.log('Fallback service successfully filed vote');
            clearInterval(interval);
        }
    }, 10000);
});
