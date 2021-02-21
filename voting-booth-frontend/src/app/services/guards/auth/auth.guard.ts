import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';

/**
 * This AuthGuard will check localStorage to check for a JWT,
 * ensuring whether a user has logged in
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const authorized = localStorage.getItem('id_token');
    if (authorized) {
      return true;
    } else {
      this.router.navigateByUrl('login')
        .then(() => console.log('Redirecting unauthorized user to loggin page'));
      return false;
    }
  }
}
