import fs from 'fs';
import {authenticate, isAuthenticated} from "../authentication";
import jwt from 'jsonwebtoken';
var express = require('express');
var router = express.Router();

export const RSA_PRIVATE_KEY = fs.readFileSync('./private.key');

/* GET users listing. */
router.get('/vote', isAuthenticated, (req, res) => {

});

router.post('/voted', (req, res) => {

});

router.post('/login', (req, res) => {
    const expiresIn = process.env.TOKEN_TTL | 120;
    // get all info needed to authenticate
    const { fname, lname, ssn, zip } = req.body;

    if (authenticate(fname, lname, ssn, zip)) {
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

router.get('/results', (req, res) => {

});

module.exports = router;
