import { Injectable, Inject } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, @Inject('AuthService') private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('... check if can active menu');
    if (this.authService.isUserLogged()) {
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
