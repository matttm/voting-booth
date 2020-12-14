import express from 'express';
import {runWorker, submitVoteToFailsafe} from "../utilities";
import {isAuthenticated} from "../services/authentication-service";

const router = express.Router();

const worker = runWorker('./dist-server/workers/blockchain-failsafe.js', () => {
    console.log('Worker is online');
});

router.post('/votes', isAuthenticated, (req, res) => {
    const vote = req.body.candidate;
    const email = req.body.email;
    const user = req.user;
    console.log('Submitting vote to failsafe service');
    submitVoteToFailsafe(worker, user, email, vote);
    res.status(200).send();
});

export default router;
