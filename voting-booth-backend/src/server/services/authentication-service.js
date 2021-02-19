import expressJwt from 'express-jwt';
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
export async function authenticate(fname, lname, ssn, zip) {
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
    // TODO: fix to be env var
    secret: `secret`,
    algorithms: ['HS256']
});
