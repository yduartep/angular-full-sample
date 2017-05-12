import { Injectable, Inject } from '@angular/core';
import { Http, URLSearchParams, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ApiConfig } from '../models/api-config';
import { CommonUtil } from '../utilities/common.util';
import { BaseAuthService } from './base-auth.service';
import { AuthService } from './auth.service';

@Injectable()
export class SkypAuthService extends BaseAuthService implements AuthService {

  constructor() {
      super(null, null);
  }

  isUserLogged(): boolean {
    return true;
  }

  getUserLogged(): string {
    return 'yahima';
  }

  getToken(): string {
    return 'yahima';
  }

  login(username: string, password: string) {
    // DO nothing
  }

  logout() {
    // DO nothing
  }
}
