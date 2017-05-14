import { XHRBackend, Http, RequestOptions } from '@angular/http';
import { InterceptedHttp } from './http.interceptor';
import { AuthHelper } from '../core/services/auth.helper';
import { SpinnerService } from '../core/spinner/spinner.service';

export function httpFactory(
  xhrBackend: XHRBackend,
  requestOptions: RequestOptions,
  spinnerService: SpinnerService,
  authHelper: AuthHelper): Http {
  return new InterceptedHttp(xhrBackend, requestOptions, spinnerService, authHelper);
}
