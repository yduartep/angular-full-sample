import {ErrorHandler, Injectable} from '@angular/core';
import {AuthHelper} from './services/auth.helper';

@Injectable()
export class SimpleErrorHandler implements ErrorHandler {
  constructor() {
  }

  unwrap(err) {
    let res = err.rejection ? err.rejection : err;
    res = res.originalError ? res.originalError : res.originalStack ? res.originalStack : res;
    return res;
  }

  handleError(error) {
    error = this.unwrap(error);

    // handle 401 Unauthorized and  403 Forbidden
    if (error.status === 401 || error.status === 403 || error === 'UNAUTHORIZED') {
      console.log('... the authentication session has expired or the user is not authorised!');
      AuthHelper.clearCookies();
      location.href = location.pathname + '#/login';
      return;
    }
    // handle 4xx Client errors
    if (error.status >= 400 && error.status < 500) {
      console.log('... the request is incorrect!');
      return;
    }
    // handle 5xx Server error
    if (error.status >= 500) {
      console.log('... the server is not responding. Contact the administrator!');
      return;
    }

    // In a real world app, you might use a remote logging infrastructure
    const errMsg = error.message ? error.message : error.toString();
    console.error(errMsg);
  }
}

