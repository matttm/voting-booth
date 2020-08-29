import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {shareReplay, tap} from 'rxjs/operators';
import {JsonWebToken} from '../../types';
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
   */
  login(ssn: string) {
    return this.http.post('api/login', {ssn})
      .pipe(
        tap(res => this.setSession),
        shareReplay()
      );
  }

  /**
   * Removes saved tokens used for authentication
   */
  logout() {
    localStorage.removeItem('id_token');
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
    return moment(expiresAt);
  }
}
