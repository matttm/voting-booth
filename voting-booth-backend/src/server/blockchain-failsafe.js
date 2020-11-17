import {handle, hasVoted} from "./utilities";
import {addBlock, getBlockchain} from "./services/blockchain-service";

/**
 * File contains code that a child process will execute to
 * act as a failsafe if the blockchain server is temporarily down.
 * The failsafe is, if the blockchain server is unreachable, the vote
 * will be saved and will attempt sending at a later time.
 **/
process.on('message', async (message) => {
    // TODO: check to ensure message is a vote
    const interval = setInterval(async () => {
        // TODO: send vote
        let [chain, err] = await handle(getBlockchain());
        if (err) {
            res.status(503).send('Voting store not reachable');
            return;
        }
        // if user has already voted, reject
        if (hasVoted(chain, user, 'true')) {
            res.status(200).json({
                success: false,
                message: 'User has already voted'
            });
            return;
        }
        let status;
        [status, err] = await handle(addBlock(vote));
    }, 10000);
});
