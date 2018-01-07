import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthHelper} from '../core/services/auth.helper';
import 'rxjs/add/operator/do';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authHelper: AuthHelper) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers = this.authHelper.addHeaderAuthorization(req.headers);

    // Clone the request to add the new header
    const clonedRequest = req.clone({headers});

    // Pass the cloned request instead of the original request to the next handle
    return next.handle(clonedRequest);
  }
}
