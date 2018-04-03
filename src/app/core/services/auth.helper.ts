import {Inject} from '@angular/core';
import {ApiConfig} from '../models/api-config';
import {CommonUtil} from '../utilities/common.util';
import {AuthTypes} from '../factories/auth.type';
import {AuthScheme} from '../models/auth-scheme.enum';
import {OauthToken} from '../models/oauth-token';
import {User} from '../models/user';
import {Md5} from 'ts-md5/dist/md5';
import {HttpHeaders} from '@angular/common/http';

export class AuthHelper {

  /** The userId constant*/
  static USER_ID = 'user';

  /** The TOKEN_ID constant*/
  static TOKEN_ID = 'token';

  /** The TOKEN_TYPE constant*/
  static TOKEN_TYPE = 'token_type';

  /** The HOBA_CLIENT_RESULT constant*/
  static HOBA_CLIENT_RESULT = 'signedClientResult';

  constructor(@Inject('api.config') private apiConfig: ApiConfig) {
  }

  /**
   * Add user id to the cookie
   * @param value the value of the user id
   * @param expiredTime the total seconds after the page should expire
   */
  static addUserInfo(value: string, expiredTime: number) {
    const expiredTimeString = CommonUtil.changeExpiredTime(expiredTime);
    document.cookie = AuthHelper.USER_ID + '=' + value + '; expires=' + expiredTimeString + '; path=/';
  }

  /**
   * Add token to the cookie
   * @param token the token with all the info
   * @param expiredTime the total seconds after the page should expire
   */
  static addTokenInfo(token: OauthToken, expiredTime: number) {
    const expiredTimeString = CommonUtil.changeExpiredTime(expiredTime);
    document.cookie = AuthHelper.TOKEN_ID + '=' + token.access_token + '; expires=' + expiredTimeString + '; path=/';
    document.cookie = AuthHelper.TOKEN_TYPE + '=' + token.token_type + '; expires=' + expiredTimeString + '; path=/';
  }

  /**
   * Remove the user id from the cookie
   */
  static removeUserInfo() {
    const expiredTimeString = CommonUtil.changeExpiredTime(0);
    document.cookie = AuthHelper.USER_ID + '=; expires=' + expiredTimeString + '; path=/';
  }

  /**
   * Remove the token from the cookie
   */
  static removeTokenInfo() {
    const expiredTimeString = CommonUtil.changeExpiredTime(0);
    document.cookie = AuthHelper.TOKEN_ID + '=; expires=' + expiredTimeString + '; path=/';
    document.cookie = AuthHelper.TOKEN_TYPE + '=; expires=' + expiredTimeString + '; path=/';
  }

  /**
   * Clear the cookies related to authentication
   */
  static clearCookies() {
    this.removeUserInfo();
    this.removeTokenInfo();
  }

  /**
   * Determine if the url is a valid http service
   */
  private static isHttpService(url) {
    return url && url.startsWith('http');
  }

  /**
   * Determine if the current url require authentication before to be called
   * @param {string} url the url
   * @returns {boolean} true if required or false
   */
  needAuthBefore(url: string) {
    if (AuthHelper.isHttpService(url)) {
      const apiUrl = CommonUtil.getApiByUrl(url, this.apiConfig);
      return apiUrl.requireAuthBefore;
    }
    return false;
  }

  /**
   * Add specific Authorization header depending of the authentication scheme defined.
   * @param {HttpHeaders} headers the headers
   * @param {User} user the user
   * @param {string} uri the uri
   * @param {string} method the method
   * @returns {HttpHeaders} the headers updated
   */
  addHeaderAuthorization(headers: HttpHeaders, user?: User, uri?: string, method?: string) {
    const authType = this.apiConfig.authService;
    let clientId, clientSecret;
    if (!CommonUtil.isEmpty(this.apiConfig.credentials)) {
      clientId = this.apiConfig.credentials.clientId;
      clientSecret = this.apiConfig.credentials.clientSecret;
    }
    switch (this.apiConfig.authScheme) {
      case AuthScheme.BASIC:
        if (!CommonUtil.isEmpty(user)) {
          return this.getBasicAuthorization(headers, user);
        } else if (!CommonUtil.isEmpty(clientId) && !CommonUtil.isEmpty(clientSecret) && authType === AuthTypes.OAUTH) {
          return this.getOauthBasicAuthorization(headers, clientId, clientSecret);
        } else {
          return headers;
        }
      case AuthScheme.BEARER:
        return this.getBearerAuthorization(headers);
      case AuthScheme.DIGEST:
        return this.getDigestAuthorization(headers, user, uri, method);
      case AuthScheme.HOBA:
        return this.getHOBAAuthorization(headers);
      case AuthScheme.AWS:
        return this.getAWSAuthorization(headers, clientId, clientSecret);
      default:
        return headers;
    }
  }

  /**
   * Determine if there is a user correctly logged in the app
   */
  isUserLogged(): boolean {
    if (this.apiConfig.authService === AuthTypes.SKYP) {
      return true;
    }
    const userId = this.getUserLogged();
    const token = this.getToken();
    return (!CommonUtil.isEmpty(userId) && !CommonUtil.isEmpty(token));
  }

  /**
   * Returns the name of the user logged in the app
   */
  getUserLogged(): string {
    if (this.apiConfig.authService === AuthTypes.SKYP) {
      return null;
    }
    return CommonUtil.getCookie(AuthHelper.USER_ID);
  }

  /**
   * Returns the token stored after login
   */
  getToken(): string {
    if (this.apiConfig.authService === AuthTypes.SKYP) {
      return null;
    }
    return CommonUtil.getCookie(AuthHelper.TOKEN_ID);
  }

  /**
   * If user is not logged go to the login page
   */
  checkAuthentication() {
    if (!this.isUserLogged()) {
      location.href = location.pathname + '#/login';
    }
  }

  /**
   * Get the basic authorization
   * @param headers the headers
   * @param {User} user the user
   * @returns the HttpHeaders updated
   */
  private getBasicAuthorization(headers: HttpHeaders, user?: User): HttpHeaders {
    if (!CommonUtil.isEmpty(user)) {
      const credentials = btoa(user.username + ':' + user.password);
      return headers.set('Authorization', `Basic ${credentials}`);
    }
    return headers;
  }

  /**
   * Get the OAUTH basic authorization
   * @param headers the headers
   * @param clientId the clientId
   * @param clientSecret the clientSecret
   * @returns {{Authorization: string}} the authorization object
   */
  private getOauthBasicAuthorization(headers: HttpHeaders, clientId, clientSecret): HttpHeaders {
    if (!CommonUtil.isEmpty(clientId) && !CommonUtil.isEmpty(clientSecret)) {
      const credentials = btoa(clientId + ':' + clientSecret);
      return headers.set('Authorization', `Basic ${credentials}`);
    }
    return headers;
  }

  /**
   * Get the bearer authorization
   *
   * @param headers the headers
   * @returns {any}  the bearer authorization
   */
  private getBearerAuthorization(headers: HttpHeaders): HttpHeaders {
    const token = CommonUtil.getCookie(AuthHelper.TOKEN_ID);
    if (!CommonUtil.isEmpty(token)) {
      return headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  /**
   * Get the digest authorization
   *
   * @param headers the headers
   * @param user the user
   * @param uri the uri
   * @param method the method
   * @returns {any}  the digest authorization
   */
  private getDigestAuthorization(headers: HttpHeaders, user: User, uri: string, method: string): HttpHeaders {
    if (!CommonUtil.isEmpty(user)) {
      // TODO check from where arrive this fields
      const nonce = 'dcd98b7102dd2f0e8b11d0f600bfb0c093';
      const nc = '00000001';
      const cnonce = '0a4f113b';
      const opaque = '5ccc069c403ebaf9f0171e9517f40e41';
      const qop = 'auth';

      const HA1 = Md5.hashStr(user.username + ':' + user.email + ':' + user.password);
      const HA2 = Md5.hashStr(method + ':' + uri);
      const response = Md5.hashStr(HA1 + ':' + nonce + ':' + nc + ':' + cnonce + ':' + qop + ':' + HA2);

      const credentials = `username=${user.username},
                          realm=${user.email},nonce=${nonce},uri=${uri},qop=auth,
                          nc=${nc},cnonce=${cnonce},response=${response},opaque=${opaque}`;
      return headers.set('Authorization', `Digest ${credentials}`);
    }
    return headers;
  }

  /**
   * Get the HOBA authorization
   *
   * @param headers the headers
   * @returns {any}  the HOBA authorization
   */
  private getHOBAAuthorization(headers: HttpHeaders): HttpHeaders {
    const signedClientResult = CommonUtil.getCookie(AuthHelper.HOBA_CLIENT_RESULT);
    if (!CommonUtil.isEmpty(signedClientResult)) {
      return headers.set('Authorized', signedClientResult);
    }
    return headers;
  }

  /**
   * Get the AWS authorization
   *
   * @param headers the headers
   * @param clientId the AWSAccessKeyId
   * @param clientSecret the AWSSecretAccessKey
   * @returns {any}  the AWS authorization
   */
  private getAWSAuthorization(headers: HttpHeaders, clientId, clientSecret): HttpHeaders {
    if (!CommonUtil.isEmpty(clientId) && !CommonUtil.isEmpty(clientSecret)) {
      const credentials = `${clientId}:${clientSecret}`;
      return headers.set('Authorization', `AWS ${credentials}`);
    }
    return headers;
  }
}
