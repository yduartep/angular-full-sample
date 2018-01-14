import {Inject, Injectable} from '@angular/core';
import {ApiConfig} from '../models/api-config';
import 'rxjs/add/operator/map';

import {CommonUtil} from '../utilities/common.util';
import {AuthService} from './auth.service';
import {AuthHelper} from './auth.helper';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {OauthToken} from '../models/oauth-token';

@Injectable()
export class OAuthService implements AuthService {

  constructor(private http: HttpClient,
              @Inject('api.config') private apiConfig: ApiConfig,
              private authHelper: AuthHelper) {
  }

  getServiceUrl(): string {
    return CommonUtil.getApiUrl('OAUTH_SERVICE_URL', this.apiConfig);
  }

  login(username: string, password: string) {
    const data = 'grant_type=password&username=' + username + '&password=' + password;
    let headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    headers = this.authHelper.addHeaderAuthorization(headers);

    return this.http.post(this.getServiceUrl(), data, {headers: headers}).map((userData: OauthToken) => {
      const expiresIn = userData.expires_in || this.apiConfig.timeExpired;

      // add access token when mock environment
      if (!userData.access_token && !userData.token_type) {
        userData = {
          'access_token': 'a61afd98-8e9e-4f16-9366-31abcc0bb522',
          'token_type': 'bearer',
          'refresh_token': 'a61afd98-8e9e-4f16-9366-31abcc0bb522',
          'expires_in': 43199,
          'scope': 'openid'
        };
      }

      // login successful if there's a jwt token in the response
      if (userData.access_token) {
        AuthHelper.addUserInfo(username, expiresIn);
        AuthHelper.addTokenInfo(userData, expiresIn);
      }

      return userData;
    });
  }

  logout() {
    // remove user session info
    AuthHelper.clearCookies();
  }
}
