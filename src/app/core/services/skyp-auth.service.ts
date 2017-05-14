import { Injectable, Inject } from '@angular/core';
import { Http, URLSearchParams, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ApiConfig } from '../models/api-config';
import { CommonUtil } from '../utilities/common.util';
import { AuthService } from './auth.service';

@Injectable()
export class SkypAuthService  implements AuthService {

  constructor() {}

  login(username: string, password: string) {
    // DO nothing
  }

  logout() {
    // DO nothing
  }
}
