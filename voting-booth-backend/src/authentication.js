import expressJwt from 'express-jwt';
import {RSA_PRIVATE_KEY} from "./routes/api";
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
