import expressJwt from 'express-jwt';
import {RSA_PRIVATE_KEY} from "../routes/api";
import request from 'superagent';
import jwt from 'jsonwebtoken';

/**
 * Determines whether provided information is of an authentic user
 * on the records server
 *
 * @param fname a first name
 * @param lname a last name
 * @param ssn a social security number
 * @param zip a zip code
 */
export async function authenticate(fname, lname, ssn, zip) {
    // TODO: change records-backend's endpoint to authenticate so this works
    // TODO: and change this action to be a GET
    return true;  // for testing
    return new Promise((resolve, reject) => {
        request
            .post(`${process.env.AUTHENTICATOR_URL}/api/authenticate`)
            .send({ fname, lname, ssn, zip })
            .catch(err => console.error(`Error: ${err}`))
            .then(res => {
                console.log(res);
                return res.body.data;
            }).then(response => resolve(response));
    });
}

/**
 * Middleware to determine if a user has been authenticated
 * by checking for a valid JWT (JSON web token)
 *
 * @type {middleware}
 */
export const isAuthenticated = expressJwt({
    secret: `${RSA_PRIVATE_KEY}`,
    algorithms: ['RS256']
});
