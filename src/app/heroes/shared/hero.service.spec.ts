import {async, getTestBed, TestBed} from '@angular/core/testing';
import {Hero} from './hero';
import {HeroService} from './hero.service';
import {MocksUtil} from '../../core/utilities/mocks.util';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController, TestRequest} from '@angular/common/http/testing';
import {AuthHelper} from '../../core/services/auth.helper';

describe('HerosService', () => {
  const apiConfig = MocksUtil.createMockedApiConfig();
  const mockResponse = MocksUtil.createMockedHeroes();

  let injector: TestBed;
  let service: HeroService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    AuthHelper.addUserInfo('fakeUser', 5);
    AuthHelper.addTokenInfo(MocksUtil.createMockedOauthToken(), 5);

    TestBed.configureTestingModule({
      providers: [
        {provide: 'api.config', useValue: apiConfig},
        {provide: 'defaultLanguage', useValue: 'en'},
        HeroService
      ],
      imports: [
        BrowserModule,
        HttpClientModule,
        HttpClientTestingModule
      ]
    });

    injector = getTestBed();
    service = injector.get(HeroService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create an instance of the HeroService', () => {
    expect(service).toBeTruthy();
  });

  it('should get list of all heroes', async(() => {
    service.findAll().subscribe((data: Hero[]) => {
      expect(data.length).toBe(mockResponse.length);
      expect(data[0].id).toBe(mockResponse[0].id);
      expect(data[0].name).toBe(mockResponse[0].name);
      expect(data[0].image).toBe(mockResponse[0].image);
    });

    const req = httpMock.expectOne(service.getServiceUrl());
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  }));

  it('should get hero by id', async(() => {
    const id = 1;

    service.findById(id).subscribe((response: Hero) => {
      expect(response.id).toBe(id);
      expect(response.name).toBe(mockResponse[0].name);
      expect(response.image).toBe(mockResponse[0].image);
      expect(response.editorial).toBe(mockResponse[0].editorial);
    });

    const req = httpMock.expectOne(`${service.getServiceUrl()}/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse[0]);
  }));

  it('should insert new Hero', async(() => {
    const hero = new Hero(null, 'Hero new', 2, 'imageNew.jpg');
    service.insert(hero).subscribe((successResult) => {
      expect(successResult).toBeDefined();
      expect(successResult.name).toBe('Hero new');
      expect(successResult.editorial).toBe(2);
      expect(successResult.image).toBe('imageNew.jpg');
    });

    const req: TestRequest = httpMock.expectOne(service.getServiceUrl());
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Content-Type')).toBe('application/json; charset=utf-8');
    req.flush(hero);
  }));

  it('should save updates to an existing hero', async(() => {
    const id = 1;
    const hero = new Hero(id, 'Hero changed', 2, 'imageChanged.jpg');
    service.update('id', hero).subscribe((successResult) => {
      expect(successResult).toBeDefined();
      expect(successResult.id).toBe(1);
      expect(successResult.name).toBe('Hero changed');
      expect(successResult.editorial).toBe(2);
      expect(successResult.image).toBe('imageChanged.jpg');
    });

    const req: TestRequest = httpMock.expectOne(`${service.getServiceUrl()}/${id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.headers.get('Content-Type')).toBe('application/json; charset=utf-8');
    req.flush(hero);
  }));

  it('should delete an existing Hero', async(() => {
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
