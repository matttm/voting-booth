import fs from 'fs';
import {isValid} from "../authentication";
var express = require('express');
var router = express.Router();

const RSA_PRIVATE_KEY = fs.readFileSync('./private.key');

/* GET users listing. */
router.get('/vote', (req, res) => {
    // get all info needed to authenticate
    const { fname, lname, ssn, zip } = req.body;

    if (isValid(fname, lname, ssn, zip)) {
        const userId = findUserIdForEmail(email);
        const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
            algorithm: 'RS256',
            expiresIn: 120,
            subject: userId
        });
        // TODO: conform key names
        res.status(200).json({
            tokenId: jwtBearerToken,
            expiresIn: null
        })
    } else {
        res.sendStatus(401);
    }
});

router.post('/voted', (req, res) => {

});

router.post('/login', (req, res) => {

});

router.get('/results', (req, res) => {

});

module.exports = router;
