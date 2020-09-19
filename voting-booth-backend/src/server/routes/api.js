import {authenticate, isAuthenticated} from "../services/authentication-service";
import jwt from 'jsonwebtoken';
import {addBlock, getBlockchain} from "../services/blockchain-service";
import express from 'express';
const router = express.Router();

export const RSA_PRIVATE_KEY = process.env.SECRET_KEY || 'shhhitsmyfallbacksecret';
export const expiresIn = process.env.TOKEN_TTL || 100;

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

router.post('/voted', isAuthenticated, async (req, res) => {
    const chain = await getBlockchain();
    // determine if this person voted
    // TODO: reimplement without use of ssn
    const hasVoted = chain.some(block => block.data.ssn === req.body.ssn);
    res.json({
        success: true,
        hasVoted
    })
});

router.post('/login', async (req, res) => {
    // get all info needed to authenticate
    const { fname, lname, ssn, zip } = req.body;
console.log(process.env.SECRET_KEY, process.env.TOKEN_TTL);
    if (await authenticate(fname, lname, ssn, zip)) {

        console.log('User is authorized');
        // ssn is too sensitive to be stored in the jwt as it can be  decoded by anyone
        const user = { fname, lname, zip };

        console.log('making user a JWT');
        const jwtBearerToken = jwt.sign(user, RSA_PRIVATE_KEY, {
            expiresIn
        });
        // TODO: conform key names between apps
        res.status(200).json({
            idToken: jwtBearerToken,
            expiresIn
        })
    } else {
        console.log('User is unauthorized');
        res.sendStatus(401);
    }
});

router.get('/results', async (req, res) => {
    const results = new Map();
    // getting blockchain
    const chain = await getBlockchain();
    // iterate blockchain and accumulate results
    for (let block of chain) {
        const vote = block.data;
        const name = vote.candidate;
        if (results.has(name)) {
            results.set(name, results.get(name) + 1);
        } else {
            results.set(name, 1);
        }
    }
    // just send it
    res.json({
        success: true,
        results
    });
});

export default router;
