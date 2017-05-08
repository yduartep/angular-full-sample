import {
  Injectable,
  Injector,
  ErrorHandler
} from '@angular/core';
import { Response } from '@angular/http';

@Injectable()
export class HagueErrorHandler implements ErrorHandler {

  unwrap(err) {
    let res = err.rejection ? err.rejection : err;
    res = res.originalError ? res.originalError : res.originalStack ? res.originalStack : res;
    return res;
  }

  handleError(error) {
    error = this.unwrap(error);

    // handle 401 Unauthorized and  403 Forbidden
    if (error.status === 401 || error.status === 403 || error === 'UNAUTHORIZED') {
      console.log('... the authentication session has expires or the user is not authorised!');
      location.href = location.pathname + 'login';
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
    let errMsg = '';
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      if (error.status > 0) {
        errMsg += `${error.status} - `;
      }
      errMsg += `${error.statusText || 'Error in the application'}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    alert(errMsg);
  }
}
