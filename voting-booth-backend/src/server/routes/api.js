import {authenticate, isAuthenticated} from "../services/authentication-service";
import jwt from 'jsonwebtoken';
import {addBlock, getBlockchain} from "../services/blockchain-service";
import express from 'express';
const router = express.Router();

export const RSA_PRIVATE_KEY = process.env.SECRET_KEY || 'shhhitsmyfallbacksecret';
export const expiresIn = process.env.TOKEN_TTL || "2h";

router.get('/authentic', isAuthenticated, async (req, res) => {
    res.status(200).send();
});

/* GET users listing. */
router.get('/vote', isAuthenticated, async (req, res) => {
    const vote = req.body;
    // ensure everything is in vote
    if (!(vote.voter && vote.candidate)) {
        res.status(400);
    }
    const status = await addBlock(vote);
    res.status(200).json({ success: status });
});

// TODO: move this to a user router
router.get('/user', isAuthenticated, async (req, res) => {
    //
    // Only meant to be used with a query for 'hasVoted'
    // GET  REQUEST api/user?voted=true
    //
    const user = req.user;
    const hasVoted = req.query.voted;
    // This cannot be shortened, as it is a bool and could be false
    if (hasVoted === undefined) {
        res.status(401).json({
            success: false,
            message: 'Required query not specified'
        })
    }
    const chain = await getBlockchain();
    // determine if this person voted
    // TODO: reimplement without use of ssn
    const answer = chain.some((block, idx) => {
        if (idx === 0)
            return;
        const { voter } = block.data;
        return voter.fname === user.fname && voter.lname === user.lname && voter.zip === user.zip;
    });
    res.json({
        success: !!answer,  // force this to be a boolean
        hasVoted: answer
    })
});

router.get('/login', async (req, res) => {
    // get all info needed to authenticate
    const { fname, lname, ssn, zip } = req.body;

    if (await authenticate(fname, lname, ssn, zip)) {

        // ssn is too sensitive to be stored in the jwt as it can be  decoded by anyone
        const user = { fname, lname, zip };

        const jwtBearerToken = jwt.sign(user, `secret`, {
            expiresIn
        });
        // TODO: conform key names between apps
        res.status(200).json({
            idToken: `Bearer ${jwtBearerToken}`,
            expiresIn
        });
    } else {
        res.status(401).send('The provided credentials do not match a record');
    }
});

router.get('/results', async (req, res) => {
    const results = new Map();
    // getting blockchain
    const chain = await getBlockchain();
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
