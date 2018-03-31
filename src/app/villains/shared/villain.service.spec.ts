import {async, getTestBed, TestBed} from '@angular/core/testing';
import {Villain} from './villain';
import {VillainService} from './villain.service';
import {MocksUtil} from '../../core/utilities/mocks.util';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController, TestRequest} from '@angular/common/http/testing';
import {AuthHelper} from '../../core/services/auth.helper';

describe('VillainsService', () => {
  const apiConfig = MocksUtil.createMockedApiConfig();
  const mockResponse = MocksUtil.createMockedVillains();

  let injector: TestBed;
  let service: VillainService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    AuthHelper.addUserInfo('fakeUser', 5);
    AuthHelper.addTokenInfo(MocksUtil.createMockedOauthToken(), 5);

    TestBed.configureTestingModule({
      providers: [
        {provide: 'api.config', useValue: apiConfig},
        {provide: 'defaultLanguage', useValue: 'en'},
        VillainService
      ],
      imports: [
        BrowserModule,
        HttpClientModule,
        HttpClientTestingModule
      ]
    });

    injector = getTestBed();
    service = injector.get(VillainService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create an instance of the VillainService', () => {
    expect(service).toBeTruthy();
  });

  it('should get list of all villains', async(() => {
    service.findAll().subscribe((data: Villain[]) => {
      expect(data.length).toBe(mockResponse.length);
      expect(data[0].id).toBe(mockResponse[0].id);
      expect(data[0].name).toBe(mockResponse[0].name);
      expect(data[0].image).toBe(mockResponse[0].image);
    });

    const req = httpMock.expectOne(service.getServiceUrl());
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  }));

  it('should get villain by id', async(() => {
    const id = 1;

    service.findById(id).subscribe((response: Villain) => {
      expect(response.id).toBe(id);
      expect(response.name).toBe(mockResponse[0].name);
      expect(response.image).toBe(mockResponse[0].image);
      expect(response.editorial).toBe(mockResponse[0].editorial);
    });

    const req = httpMock.expectOne(`${service.getServiceUrl()}/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse[0]);
  }));

  it('should insert new Villain', async(() => {
    const villain = new Villain(null, 'Villain new', 2, 'imageNew.jpg');
    service.insert(villain).subscribe((successResult) => {
      expect(successResult).toBeDefined();
      expect(successResult.name).toBe('Villain new');
      expect(successResult.editorial).toBe(2);
      expect(successResult.image).toBe('imageNew.jpg');
    });

    const req: TestRequest = httpMock.expectOne(service.getServiceUrl());
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Content-Type')).toBe('application/json; charset=utf-8');
    req.flush(villain);
  }));

  it('should save updates to an existing villain', async(() => {
    const id = 1;
    const villain = new Villain(id, 'Villain changed', 2, 'imageChanged.jpg');
    service.update('id', villain).subscribe((successResult) => {
      expect(successResult).toBeDefined();
      expect(successResult.id).toBe(1);
      expect(successResult.name).toBe('Villain changed');
      expect(successResult.editorial).toBe(2);
      expect(successResult.image).toBe('imageChanged.jpg');
    });

    const req: TestRequest = httpMock.expectOne(`${service.getServiceUrl()}/${id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.headers.get('Content-Type')).toBe('application/json; charset=utf-8');
    req.flush(villain);
  }));

  it('should delete an existing Villain', async(() => {
    const id = 1;
    service.delete(id).subscribe(
      (successResult) => {
        expect(successResult).toBeDefined();
      },
      (errorResult) => {
        throw (errorResult);
      });

    const req: TestRequest = httpMock.expectOne(`${service.getServiceUrl()}/${id}`);
    expect(req.request.method).toBe('DELETE');
  }));
});
