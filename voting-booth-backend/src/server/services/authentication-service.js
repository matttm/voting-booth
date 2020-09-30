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
    // return Promise.resolve(true);  // for testing
    const response = await request
            .get(`${process.env.AUTHENTICATOR_URL}/api/persons/authenticate`)
            .send({ fname, lname, ssn, zip });

    return response.body?.data;
}

/**
 * Middleware to determine if a user has been authenticated
 * by checking for a valid JWT (JSON web token)
 *
 * @type {middleware}
 */
export const isAuthenticated = expressJwt({
    secret: `secret`,
    algorithms: ['HS256']
});
