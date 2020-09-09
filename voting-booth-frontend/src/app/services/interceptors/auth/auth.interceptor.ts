import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

/**
 * An interceptor responsible for authentication. If a JWT id exists in
 * local storage, it will be attached to the request being sent to the
 * application server.
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const idToken = localStorage.getItem('token_id');
    if (idToken) {
      const newReq = req.clone({
        headers: req.headers.set(
          'Authorization',
          'Bearer' + idToken
        )
      });
      return next.handle(newReq);
    } else {
      return next.handle(req);
    }
  }
}
