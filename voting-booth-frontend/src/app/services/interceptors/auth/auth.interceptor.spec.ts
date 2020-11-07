
import {async, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {AuthInterceptor} from './auth.interceptor';
import {HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {establishLocalStorageSpies} from '../../../test.utilities.spec';

/**
 * TestService is a utility to help test the interceptor
 */
@Injectable()
class TestService {
  constructor(private http: HttpClient) {}
  test() { return this.http.get('/test').toPromise(); }
}

describe('AuthInterceptor', () => {
  let service: TestService;
  let http: HttpTestingController;

  beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
          TestService,
          {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
          }
        ]
      }).compileComponents();

      establishLocalStorageSpies();
      service = TestBed.get(TestService);
      http = TestBed.get(HttpTestingController);
    }
  ));

  afterEach(() => {});

  it('have a valid service for testing', () => {
    expect(service).toBeTruthy();
  });

  it('should add token to request', () => {
    localStorage.setItem('id_token', 'testy');
    service.test();
    const request = http.expectOne('/test');
    expect(request.request.headers.has('Authorization')).toBeTruthy();
  });

  it('should not add token to request', () => {
    service.test();
    const request = http.expectOne('/test');
    expect(request.request.headers.has('Authorization')).toBeFalsy();
  });
});
