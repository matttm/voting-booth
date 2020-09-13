import fs from 'fs';
import {authenticate, isAuthenticated} from "../authentication";
import jwt from 'jsonwebtoken';
import request from 'superagent';
import {getBlockchain} from "../blockchain-service";
var express = require('express');
var router = express.Router();

export const RSA_PRIVATE_KEY = fs.readFileSync('./private.key');

/* GET users listing. */
router.get('/vote', isAuthenticated, (req, res) => {

});

router.post('/voted', async (req, res) => {
    const chain = await getBlockchain();
    // determine if this person voted
    const hasVoted = chain.some(block => block.data.ssn === req.body.ssn);
    res.json({
        success: true,
        hasVoted
    })

});

router.post('/login', async (req, res) => {
    const expiresIn = process.env.TOKEN_TTL | 120;
    // get all info needed to authenticate
    const { fname, lname, ssn, zip } = req.body;

    if (await authenticate(fname, lname, ssn, zip)) {
        // TODO: find another way for user identification
        const userId = fname + lname + zip;
        const payload = { userId };
        const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
            algorithm: 'RS256',
            expiresIn
        });
        // TODO: conform key names between apps
        res.status(200).json({
            idToken: jwtBearerToken,
            expiresIn
        })
    } else {
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

module.exports = router;
