import fs from 'fs';
import {authenticate, isAuthenticated} from "../authentication";
var express = require('express');
var router = express.Router();

export const RSA_PRIVATE_KEY = fs.readFileSync('./private.key');

/* GET users listing. */
router.get('/vote', isAuthenticated, (req, res) => {

});

router.post('/voted', (req, res) => {

});

router.post('/login', (req, res) => {
// get all info needed to authenticate
    const { fname, lname, ssn, zip } = req.body;

    if (authenticate(fname, lname, ssn, zip)) {
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

router.get('/results', (req, res) => {

});

module.exports = router;
