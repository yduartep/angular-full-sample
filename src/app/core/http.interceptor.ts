import { Injectable } from '@angular/core';
import {
  ConnectionBackend,
  RequestOptions,
  Request,
  RequestOptionsArgs,
  Response,
  Http, Headers
} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { CommonUtil } from './utilities/common.util'

@Injectable()
export class InterceptedHttp extends Http {
  // TODO how to inject these values into the service
  NOT_REQUIRE_AUTH = ['/oauth/token', 'logout'];
  USER_ID = 'userId';
  TOKEN_ID = 'token';
  AUTH_TYPE = 'Bearer';

  constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
    super(backend, defaultOptions);
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.canCallHttp(url) ? super.get(url, this.getRequestOptionArgs(options)) : this.getAuthError();
  }

  post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.canCallHttp(url) ? super.post(url, body, this.getRequestOptionArgs(options)) : this.getAuthError();
  }

  put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.canCallHttp(url) ? super.put(url, body, this.getRequestOptionArgs(options)) : this.getAuthError();
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.canCallHttp(url) ? super.delete(url, this.getRequestOptionArgs(options)) : this.getAuthError();
  }

  private canCallHttp(url) {
    if (url) {
      const userId = CommonUtil.getCookie(this.USER_ID), token = CommonUtil.getCookie(this.TOKEN_ID);
      return (!CommonUtil.isEmpty(userId) && !CommonUtil.isEmpty(token)) || !this.needAuthBefore(url);
    }
    return true;
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

    const token = CommonUtil.getCookie(this.TOKEN_ID);
    if (!CommonUtil.isEmpty(token)) {
      options.headers.set('Authorization', `${this.AUTH_TYPE} ${token}`);
    }
    return options;
  }
}
