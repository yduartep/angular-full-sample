import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {
  HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {AuthHelper} from '../core/services/auth.helper';
import {SpinnerService} from '../core/spinner/spinner.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authHelper: AuthHelper,
              private spinnerService: SpinnerService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isUserAuthenticated(request.url)) {
      return this.getAuthError();
    } else {
      // show spinner before call the request
      this.spinnerService.show();
      return next.handle(request).do((event: HttpEvent<any>) => {
        // hide spinner when response arrive
        this.spinnerService.hide();
      });
    }
  }

  /**
   * Returns true If the url doesn't require previous authentication or
   * require it but the user is already logged in
   */
  private isUserAuthenticated(url) {
    return this.authHelper.isUserLogged() || !this.authHelper.needAuthBefore(url);
  }

  /**
   * Throw 401 request error
   * @returns {ErrorObservable} Observable with the error info
   */
  private getAuthError() {
    return Observable.throw({status: 401, statusText: 'UNAUTHORIZED'});
  }
}
