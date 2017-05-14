import { Injectable, Inject } from '@angular/core';
import {
  ConnectionBackend,
  RequestOptions,
  Request,
  RequestOptionsArgs,
  Response,
  Http, Headers
} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { CommonUtil } from '../core/utilities/common.util';
import { AuthService } from '../core/services/auth.service';
import { SpinnerService } from '../core/spinner/spinner.service';
import { COOKIE_IDENTIFIERS } from '../cookie.identifiers';

@Injectable()
export class InterceptedHttp extends Http {
  // TODO how to inject these values into the service
  NOT_REQUIRE_AUTH = ['/oauth/token', 'logout'];
  AUTH_TYPE = 'Bearer';

  constructor(
    backend: ConnectionBackend,
    defaultOptions: RequestOptions,
    private spinnerService: SpinnerService
  ) {
    super(backend, defaultOptions);
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    if (this.isValidHttp(url)) {
      if (this.canCallHttp(url)) {
        this.requestInterceptor(url);
        return super.get(url, this.getRequestOptionArgs(options)).finally(() => this.onFinally());
      } else {
        return this.getAuthError()
      }
    } else {
      // if is other kind of resource
      return super.get(url, this.getRequestOptionArgs(options));
    }
  }

  post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    if (this.isValidHttp(url)) {
      if (this.canCallHttp(url)) {
        this.requestInterceptor(url);
        return super.post(url, body, this.getRequestOptionArgs(options)).finally(() => this.onFinally());
      } else {
        return this.getAuthError()
      }
    } else {
      // if is other kind of resource
      return super.post(url, body, this.getRequestOptionArgs(options));
    }
  }

  put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    if (this.isValidHttp(url)) {
      if (this.canCallHttp(url)) {
        this.requestInterceptor(url);
        return super.put(url, body, this.getRequestOptionArgs(options)).finally(() => this.onFinally());
      } else {
        return this.getAuthError()
      }
    } else {
      // if is other kind of resource
      return super.put(url, body, this.getRequestOptionArgs(options));
    }
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    if (this.isValidHttp(url)) {
      if (this.canCallHttp(url)) {
        this.requestInterceptor(url);
        return super.delete(url, this.getRequestOptionArgs(options)).finally(() => this.onFinally());
      } else {
        return this.getAuthError()
      }
    } else {
      // if is other kind of resource
      return super.delete(url, this.getRequestOptionArgs(options));
    }
  }
  /**
   * Determine if the url is a valid http service
   */
  private isValidHttp(url) {
    return url && url.startsWith('http');
  }

  /**
   * Returns true If the url doesn't require previous authentication or require it bu the user is already logged in
   */
  private canCallHttp(url) {
    const userId = CommonUtil.getCookie(COOKIE_IDENTIFIERS.USER_ID), token = CommonUtil.getCookie(COOKIE_IDENTIFIERS.TOKEN_ID);
    return (!CommonUtil.isEmpty(userId) && !CommonUtil.isEmpty(token)) || !this.needAuthBefore(url);
  }

  private needAuthBefore(url: string) {
    return this.NOT_REQUIRE_AUTH.find(partUrl => url.indexOf(partUrl) >= 0) == null;
  }

  private getAuthError() {
    return Observable.throw({ status: 401, statusText: 'UNAUTHORIZED' });
  }

  private getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
    options = options || new RequestOptions();
    options.headers = options.headers || new Headers();
    if (!options.headers.get('content-type')) {
      options.headers.append('content-type', 'application/json; charset=utf-8');
    }

    const token = CommonUtil.getCookie(COOKIE_IDENTIFIERS.TOKEN_ID);
    if (!CommonUtil.isEmpty(token)) {
      options.headers.set('Authorization', `${this.AUTH_TYPE} ${token}`);
    }
    return options;
  }

  /**
     * Request interceptor.
     */
  private requestInterceptor(url): void {
    if (this.needAuthBefore(url)) {
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
