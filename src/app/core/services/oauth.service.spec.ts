import { TestBed, getTestBed, async, inject } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Headers, BaseRequestOptions, Response, HttpModule, Http, XHRBackend, RequestMethod, ResponseOptions } from '@angular/http';
import { ApiUrl } from '../models/api-url';
import { ApiConfig } from '../models/api-config';
import { MocksUtil } from '../utilities/mocks.util';
import { OAuthService } from '../services/oauth.service';
import { AuthService } from '../services/auth.service';

describe('AuthenticationService', () => {
  let mockBackend: MockBackend;
  const expectedUrl = 'http://localhost:3000/api/oauth/token';
  const apiConfig = MocksUtil.createMockedApiConfig([new ApiUrl('AUTH_SERVICE_URL', expectedUrl)]);
  const mockResponse = MocksUtil.createMockedOauthToken();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: 'api.config', useValue: apiConfig },
        { provide: 'cookie.user.id', useValue: 'userId' },
        { provide: 'cookie.token.id', useValue: 'token' },
        { provide: 'AuthService', useClass: OAuthService },
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          deps: [MockBackend, BaseRequestOptions],
          useFactory: (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          }
        }
      ],
      imports: [HttpModule]
    });
    mockBackend = getTestBed().get(MockBackend);
  });

  it('should create an instance of the service',
    inject([OAuthService], (service: AuthService) => {
      expect(service).toBeTruthy();
    }));

  it('should get oauth token', async(
    inject([OAuthService], (service: AuthService) => {
      const username = 'fakeUserId', password = 'fakePassword';

      mockBackend.connections.subscribe((connection: MockConnection) => {
        const data = 'grant_type=password&username=' + username + '&password=' + password;
        const authorization = 'Basic ' + btoa(apiConfig.credentials.clientId + ':' + apiConfig.credentials.clientSecret);

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

        expect(service.getUserLogged()).toEqual(username);
        expect(service.getToken()).toEqual(mockResponse.access_token);
      });
    })));

  it('should logout from the application', async(inject([OAuthService], (service: AuthService) => {
    service.logout();

    expect(service.getUserLogged()).toEqual('');
    expect(service.getToken()).toEqual('');
  })));
});
