import {Inject, Injectable} from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import {AuthHelper} from '../services/auth.helper';
import {LoggerService} from '../services/logger.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private authHelper: AuthHelper,
              @Inject('LoggerService') private loggerService: LoggerService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.loggerService.log('... check if can active menu');
    if (this.authHelper.isUserLogged()) {
      // logged in so return true
      this.loggerService.log('... the user is logged so you can activate the menu');
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.loggerService.log('... the user is NOT logged so you will be redirected to the login page');
    this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
    return false;
  }
}
