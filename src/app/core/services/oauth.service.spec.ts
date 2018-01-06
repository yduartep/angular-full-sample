import {TestBed, getTestBed, async, inject} from '@angular/core/testing';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {
  BaseRequestOptions,
  Response,
  HttpModule,
  Http,
  XHRBackend,
  RequestMethod,
  ResponseOptions
} from '@angular/http';
import {OAuthService} from '../services/oauth.service';
import {AuthService} from '../services/auth.service';
import {AuthHelper} from '../services/auth.helper';
import {authFactory} from '../factories/auth.factory';
import {CommonUtil} from '../utilities/common.util';
import {MocksUtil} from '../utilities/mocks.util';
import {BrowserModule} from '@angular/platform-browser';
import {CoreModule} from '../core.module';
import {SharedModule} from '../../shared/shared.module';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClientModule, HttpParams, HttpRequest} from '@angular/common/http';
import {Injector} from "@angular/core";

describe('OAuthService', () => {
  let injector: Injector;
  const expectedUrl = 'http://localhost:3000/api/oauth/token';
  const apiConfig = MocksUtil.createMockedApiConfig();
  const mockResponse = MocksUtil.createMockedOauthToken();
  let httpMock: HttpTestingController;

  beforeEach(() => {
    injector = TestBed.configureTestingModule({
      providers: [
        {provide: 'api.config', useValue: apiConfig},
        {provide: 'defaultLanguage', useValue: 'en'},
        {provide: 'AuthService', useFactory: authFactory, deps: [Http]},
        AuthHelper,
        OAuthService
      ],
      imports: [
        BrowserModule,
        CoreModule,
        SharedModule,
        HttpClientTestingModule
      ]
    });

    httpMock = injector.get(HttpTestingController);
  });

  // afterEach(() => {
  //   httpMock.verify();
  // });

  it('should create an instance of the service',
    inject([OAuthService], (service: AuthService) => {
      expect(service).toBeTruthy();
    }));

  it('should get oauth token', async(
    inject([OAuthService, AuthHelper], (service: AuthService, authHelper: AuthHelper) => {
      const username = 'fakeUserId', password = 'fakePassword';

      service.login(username, password).subscribe((userData) => {
        expect(userData.access_token).toEqual(mockResponse.access_token);
        expect(userData.token_type).toEqual(mockResponse.token_type);
        expect(userData.expires_in).toEqual(mockResponse.expires_in);
        expect(userData.refresh_token).toEqual(mockResponse.refresh_token);
        expect(userData.scope).toEqual(mockResponse.scope);

        expect(authHelper.getUserLogged()).toEqual(username);
        expect(authHelper.getToken()).toEqual(mockResponse.access_token);
      });

      // backend.expectOne((req: HttpRequest<any>) => {
      //   const body = new HttpParams({fromString: req.body});
      //
      //   return req.url === expectedUrl
      //     && req.method === 'POST'
      //     && req.headers.get('Content-Type') === 'application/x-www-form-urlencoded'
      //     && body.get('username') === 'fakeUserId'
      //     && body.get('password') === 'fakePassword'
      //     && body.get('grant_type') === 'password';
      // }, `POST to 'oauth/login' with form-encoded user and password`);
    })));

  it('should logout from the application', async(
    inject([OAuthService, AuthHelper], (service: AuthService, authHelper: AuthHelper) => {
      const token = 'aaabbbccc';
      const userId = 'testUser';
      const seconds = 5;
      const expiredTimeString = CommonUtil.changeExpiredTime(seconds);
      document.cookie = AuthHelper.TOKEN_ID + '=' + token + '; expires=' + expiredTimeString + '; path=/';
      document.cookie = AuthHelper.USER_ID + '=' + userId + '; expires=' + expiredTimeString + '; path=/';

      service.logout();

      expect(authHelper.getUserLogged()).toEqual('');
      expect(authHelper.getToken()).toEqual('');
    })));
});
