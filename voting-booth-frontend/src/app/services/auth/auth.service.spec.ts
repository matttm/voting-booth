import {async, TestBed} from '@angular/core/testing';
import { AuthService } from './auth.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {establishLocalStorageSpies} from '../../test.utilities.spec';
import * as moment from 'moment';

describe('AuthService', () => {
  let service: AuthService;
  let http: HttpTestingController;

  beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
          AuthService
        ]
      }).compileComponents();

      establishLocalStorageSpies();
      service = TestBed.get(AuthService);
      http = TestBed.get(HttpTestingController);
    }
  ));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send POST and add token to storage', () => {
    service.login('test', 'test', 'test', 'test');
    const request = http.expectOne('/api/login');
    expect(request.request.method).toBe('POST');
    expect(localStorage.getItem('token_id')).toBeDefined();
    expect(localStorage.getItem('expires_at')).toBeDefined();
  });

  it('should remove token from storage', () => {
    localStorage.setItem('token_id', 'testing');
    localStorage.setItem('expires_at', 'testy');
    service.logout();
    expect(localStorage.getItem('token_id')).toBeFalsy();
    expect(localStorage.getItem('expires_at')).toBeFalsy();
  });

  it('should get expiration date when token exists', () => {
    localStorage.setItem('expires_at', JSON.stringify(moment().fromNow()));
    const exp = service.getExpiration();
    expect(exp).toBeTruthy();
  });

  it('should get not expiration date when token does not exist', () => {
    const exp = service.getExpiration();
    expect(exp).toBeFalsy();
  });
});
