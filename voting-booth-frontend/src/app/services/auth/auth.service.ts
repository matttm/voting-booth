import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {shareReplay} from 'rxjs/operators';

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
      .pipe(shareReplay());
  }

  logout() {}

  private setSession(authToken: JsonWebToken) {
    const expiresAt  = authToken.expiresIn;
    localStorage.setItem('id_token', authToken.tokenId);
    localStorage.setItem('expires_at', expiresAt);
  }
}
