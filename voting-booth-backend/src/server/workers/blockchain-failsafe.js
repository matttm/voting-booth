import {handle, hasVoted} from "../utilities";
import {addBlock, getBlockchain} from "../services/blockchain-service";
import {parentPort} from 'worker_threads';

/**
 * File contains code that a child process will execute to
 * act as a failsafe if the blockchain server is temporarily down.
 * The failsafe is, if the blockchain server is unreachable, the vote
 * will be saved and will attempt sending at a later time.
 **/
parentPort.on('message', async (message) => {
    console.log('Worker got a message');
    const user = message.user;
    const vote = message.vote;
    const email = message.email;
    if (!user || !vote) {
        console.log("Fallback service's message was invalid");
        return;
    }
    const interval = setInterval(async () => {
        console.log('Retrying vote submission');
        let [chain, err] = await handle(getBlockchain());
        if (err) {
            console.log('Fallback service failed to file vote');
        }
        // if user has already voted, reject
        if (hasVoted(chain, user, 'true')) {
            console.log('Fallback service determined that user already voted');
            clearInterval(interval);
        }
        let status;
        [status, err] = await handle(addBlock(vote));
        if (err) {
            console.log('Fallback service failed to file vote')
        }
        if (status) {
            console.log('Fallback service successfully filed vote');
            // TODO: send an email on success?
            clearInterval(interval);
        }
    }, 10000);
});
