import expressJwt from 'express-jwt';
import {RSA_PRIVATE_KEY} from "./routes/api";
import request from 'superagent';

/**
 * Determines whether provided information is of an authentic user
 * on the records server
 *
 * @param fname a first name
 * @param lname a last name
 * @param ssn a social security number
 * @param zip a zip code
 */
export function authenticate(fname, lname, ssn, zip) {
    // TODO: change records-backend's endpoint to authenticate so this works
    return new Promise((resolve, reject) => {
        request
            .post('/api/authenticate')
            .send({ fname, lname, ssn, zip })
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
    secret: RSA_PRIVATE_KEY
});
