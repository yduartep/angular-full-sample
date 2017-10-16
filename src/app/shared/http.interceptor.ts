import {Injectable} from '@angular/core';
import {
  ConnectionBackend,
  RequestOptions,
  RequestOptionsArgs,
  Response,
  Http, Headers
} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {AuthHelper} from '../core/services/auth.helper';
import {SpinnerService} from '../core/spinner/spinner.service';

@Injectable()
export class InterceptedHttp extends Http {

  constructor(backend: ConnectionBackend,
              defaultOptions: RequestOptions,
              private spinnerService: SpinnerService,
              private authHelper: AuthHelper) {
    super(backend, defaultOptions);
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    if (this.isHttpService(url)) {
      if (this.canCallHttp(url)) {
        this.requestInterceptor(url);
        return super.get(url, this.getRequestOptionArgs(options)).finally(() => this.onFinally());
      } else {
        return this.getAuthError();
      }
    } else {
      // if is other kind of resource
      return super.get(url, this.getRequestOptionArgs(options));
    }
  }

  post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    if (this.isHttpService(url)) {
      if (this.canCallHttp(url)) {
        this.requestInterceptor(url);
        return super.post(url, body, this.getRequestOptionArgs(options)).finally(() => this.onFinally());
      } else {
        return this.getAuthError();
      }
    } else {
      // if is other kind of resource
      return super.post(url, body, this.getRequestOptionArgs(options));
    }
  }

  put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    if (this.isHttpService(url)) {
      if (this.canCallHttp(url)) {
        this.requestInterceptor(url);
        return super.put(url, body, this.getRequestOptionArgs(options)).finally(() => this.onFinally());
      } else {
        return this.getAuthError();
      }
    } else {
      // if is other kind of resource
      return super.put(url, body, this.getRequestOptionArgs(options));
    }
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    if (this.isHttpService(url)) {
      if (this.canCallHttp(url)) {
        this.requestInterceptor(url);
        return super.delete(url, this.getRequestOptionArgs(options)).finally(() => this.onFinally());
      } else {
        return this.getAuthError();
      }
    } else {
      // if is other kind of resource
      return super.delete(url, this.getRequestOptionArgs(options));
    }
  }

  /**
   * Determine if the url is a valid http service
   */
  private isHttpService(url) {
    return url && url.startsWith('http');
  }

  /**
   * Returns true If the url doesn't require previous authentication or
   * require it but the user is already logged in
   */
  private canCallHttp(url) {
    return this.authHelper.isUserLogged() || !this.authHelper.needAuthBefore(url);
  }

  /**
   * Throw 401 request error
   * @returns {ErrorObservable} Observable with the error info
   */
  private getAuthError() {
    return Observable.throw({status: 401, statusText: 'UNAUTHORIZED'});
  }

  /**
   * Gets the request options
   * @param {RequestOptionsArgs} options the options
   * @returns {RequestOptionsArgs} the options updated
   */
  private getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
    options = options || new RequestOptions();
    options.headers = options.headers || new Headers();
    if (!options.headers.get('content-type')) {
      options.headers.append('content-type', 'application/json; charset=utf-8');
    }
    // add header authorization if specified
    this.authHelper.addHeaderAuthorization(options.headers);

    return options;
  }

  /**
   * Request interceptor.
   */
  private requestInterceptor(url): void {
    if (this.authHelper.needAuthBefore(url)) {
      this.spinnerService.show();
    }
  }

  /**
   * Response interceptor.
   */
  private responseInterceptor(): void {
    this.spinnerService.hide();
  }

  /**
   * onFinally
   */
  private onFinally(): void {
    this.responseInterceptor();
  }
}
