import express from 'express';
import {runWorker, submitVoteToFailsafe} from "../utilities";
import {isAuthenticated} from "../services/authentication-service";

const router = express.Router();

const worker = runWorker('./dist-server/workers/blockchain-failsafe.js', () => {
    console.log('Worker is online');
});

router.post('/votes', isAuthenticated, () => {
    const vote = req.body;
    const user = req.user;
    console.log('Submitting vote to fsailsafe service');
    submitVoteToFailsafe(worker, user, vote);
});

export default router;
