import { Injectable, Inject } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { AuthHelper } from '../services/auth.helper';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authHelper: AuthHelper) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('... check if can active menu');
    if (this.authHelper.isUserLogged()) {
      // logged in so return true
      console.log('... the user is logged so you can activate the menu');
      return true;
    }

    // not logged in so redirect to login page with the return url
    console.log('... the user is NOT logged so you will be redirected to the login page');
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
