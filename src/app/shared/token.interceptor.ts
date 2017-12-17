import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthHelper} from '../core/services/auth.helper';
import 'rxjs/add/operator/do';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authHelper: AuthHelper) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.authHelper.addHeaderAuthorization(request.headers);
    const authReq = request.clone({headers: request.headers});
    return next.handle(authReq);
  }
}
