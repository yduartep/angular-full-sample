import { TestBed, getTestBed, async, inject } from '@angular/core/testing';
import { AuthenticationService } from '../services/authentication.service';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Headers, BaseRequestOptions, Response, HttpModule, Http, XHRBackend, RequestMethod, ResponseOptions } from '@angular/http';
import { Application } from '../models/Application';
import { ApiConfig } from '../models/api-config';
import { MocksUtil } from '../utilities/mocks.util';
import { AuthHelper } from '../utilities/auth.helper';

describe('AuthenticationService', () => {
  let mockBackend: MockBackend;
  const expectedUrl = 'http://localhost:3000/api/oauth/token';
  const apiConfig = MocksUtil.createMockedApiConfig([{ id: 'AUTH_SERVICE_URL', url: expectedUrl }]);
  const mockResponse = MocksUtil.createMockedOauthToken();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: 'api.config', useValue: apiConfig },
        { provide: 'cookie.user.id', useValue: 'userId' },
        { provide: 'cookie.token.id', useValue: 'token' },
        AuthenticationService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          deps: [MockBackend, BaseRequestOptions],
          useFactory: (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          }
        },
        AuthHelper
      ],
      imports: [HttpModule]
    });
    mockBackend = getTestBed().get(MockBackend);
  });

  it('should create an instance of the service',
    inject([AuthenticationService, AuthHelper], (service: AuthenticationService, authHelper: AuthHelper) => {
      expect(service).toBeTruthy();
    }));

  it('should get oauth token', async(
    inject([AuthenticationService, AuthHelper], (service: AuthenticationService, authHelper: AuthHelper) => {
      const username = 'fakeUserId', password = 'fakePassword';

      mockBackend.connections.subscribe((connection: MockConnection) => {
        const data = 'grant_type=password&username=' + username + '&password=' + password;
        const authorization = 'Basic ' + btoa(apiConfig.clientId + ':' + apiConfig.clientSecret);

        expect(connection.request.method).toBe(RequestMethod.Post);
        expect(connection.request.url).toEqual(expectedUrl);
        expect(connection.request.getBody()).toEqual(data);
        expect(connection.request.headers.get('Content-Type')).toEqual('application/x-www-form-urlencoded');
        expect(connection.request.headers.get('Authorization')).toEqual(authorization);
        connection.mockRespond(new Response(new ResponseOptions({ body: mockResponse })));
      });

      service.login(username, password).subscribe((userData) => {
        expect(userData.access_token).toEqual(mockResponse.access_token);
        expect(userData.token_type).toEqual(mockResponse.token_type);
        expect(userData.expires_in).toEqual(mockResponse.expires_in);
        expect(userData.refresh_token).toEqual(mockResponse.refresh_token);
        expect(userData.scope).toEqual(mockResponse.scope);

        expect(authHelper.getUserLogged()).toEqual(username);
        expect(authHelper.getToken()).toEqual(mockResponse.access_token);
      });
    })));

  it('should logout from the application', async(
    inject([AuthenticationService, AuthHelper], (service: AuthenticationService, authHelper: AuthHelper) => {
      authHelper.addUserInfo('fakeUserId', 10);
      authHelper.addTokenInfo('12345-6789', 10);

      service.logout();

      expect(authHelper.getUserLogged()).toEqual('');
      expect(authHelper.getToken()).toEqual('');
    })));
});
