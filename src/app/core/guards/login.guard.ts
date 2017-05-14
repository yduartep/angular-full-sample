import { Injectable, Inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private router: Router, @Inject('AuthService') private authService: AuthService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    // go to default page if the user is already logged in
    if (this.authService.isUserLogged()) {
      this.router.navigate(['/'], { queryParams: { returnUrl: state.url } });
    }
    return true;
  }
}
