import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {shareReplay, tap} from 'rxjs/operators';
import {JsonWebToken, JwtMessage} from '../../types';
import * as moment from 'moment';

/**
 * Service class in charge of authenticating credentials
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  /**
   * Sends information to the backend server to validate
   * @param ssn the social security number to validate
   * @param fname the first name of person to be validated
   * @param lname the last name of person to be validated
   * @param zip the zip code of person to be validated
   *
   * @return an observable of a successful or failure during login and
   * s JWT if successful
   */
  login(
    ssn: string,
    fname: string,
    lname: string,
    zip: string
  ): Promise<HttpResponse<JwtMessage>> {
    // TODO: make the backend accept this request as POST
    const voter = { ssn, fname, lname, zip };
    return this.http.post<JsonWebToken>
    (`/api/login`, voter, { observe: 'response' })
      .pipe(
        tap(res => this.setSession(res.body)),
        shareReplay()
      ).toPromise();
    // return new Promise<any>(resolve => setTimeout(resolve, 5000));
  }

  /**
   * Removes saved tokens used for authentication
   */
  logout() {
    localStorage.removeItem('token_id');
    localStorage.removeItem('expires_at');
  }

  /**
   * Saves authentication token
   * @param authToken json token received from the authentication server
   */
  private setSession(authToken: JsonWebToken) {
    const expiresAt  = moment().add(authToken.expiresIn);
    localStorage.setItem('id_token', authToken.tokenId);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt));
  }

  /**
   * Returns the time that the authentication token expires
   */
  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return expiresAt ? moment(expiresAt) : null;
  }
}
