import {authenticate, isAuthenticated} from "../services/authentication-service";
import jwt from 'jsonwebtoken';
import {addBlock, getBlockchain} from "../services/blockchain-service";
import express from 'express';
import failsafeRouter from './failsafe';
import {handle, hasVoted} from "../utilities";

const router = express.Router();

export const RSA_PRIVATE_KEY = process.env.SECRET_KEY || 'shhhitsmyfallbacksecret';
export const expiresIn = process.env.TOKEN_TTL || "2h";

router.use('/failsafe', failsafeRouter);

router.get('/authentic', isAuthenticated, async (req, res) => {
    res.status(200).send();
});


router.post('/votes', isAuthenticated, async (req, res) => {
    const vote = req.body;
    const user = req.user;
    // ensure everything is in vote
    if (!vote.candidate) {
        res.status(400).send();
        return;
    }
    // add the voter info to the vote
    vote.voter = {
        fname: user.fname,
        lname: user.lname,
        zip: user.zip
    };
    let [chain, err] = await handle(getBlockchain());
    if (err) {
        res.status(503).send('Voting store not currently reachable');
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
    if (err) {
        res.status(503).send('Voting store not currently reachable');
    }
    res.status(200).json({ success: status });
});

// TODO: move this to a user router
router.get('/user', isAuthenticated, async (req, res) => {
    //
    // Only meant to be used with a query for 'hasVoted'
    // GET  REQUEST api/user?voted=true
    //
    const user = req.user;
    const assertVote = req.query.voted;
    // This cannot be shortened, as it is a bool and could be false
    if (assertVote === undefined) {
        res.status(401).json({
            success: false,
            message: 'Required query not specified'
        })
    }
    const [chain, err] = await handle(getBlockchain());
    if (err) {
        res.status(503).send('Voting store not reachable');
        return;
    }
    const answer = hasVoted(chain, user, assertVote);
    res.json({
        success: true,
        hasVoted: answer
    });
});

router.post('/login', async (req, res) => {
    // get all info needed to authenticate
    const { fname, lname, ssn, zip } = req.body;

    let [authenticated, err] = await handle(authenticate(fname, lname, ssn, zip));
    if (err) {
        res.status(503).send('Authentication server not reachable');
        return;
    }
    if (authenticated) {
        // ssn is too sensitive to be stored in the jwt as it can be  decoded by anyone
        const user = { fname, lname, zip };

        // TODO: figure how to use a var for the secret
        const jwtBearerToken = jwt.sign(user, `secret`, {
            expiresIn
        });
        // TODO: conform key names between apps
        res.status(200).json({
            idToken: jwtBearerToken,
            expiresIn
        });
    } else {
        res.status(401).send('The provided credentials do not match a record');
    }
});

router.get('/results', async (req, res) => {
    const results = new Map();
    // getting blockchain
    const [chain, err] = await handle(getBlockchain());
    if (err) {
        console.error(`Error: ${err}`);
        res.status(503).send('Voting store not reachable');
        return;
    }
    // iterate blockchain and accumulate results
    for (let i = 1; i < chain.length; i++) {
        const vote = chain[i].data;
        const name = vote.candidate;
        if (results.has(name)) {
            results.set(name, results.get(name) + 1);
        } else {
            results.set(name, 1);
        }
    }
    // just send it
    res.status(200).json({
        success: true,
        results: [...results]
    });
});

export default router;
