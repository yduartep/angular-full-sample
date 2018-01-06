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
import {Hero} from './hero';
import {HeroService} from './hero.service';
import {MocksUtil} from '../../core/utilities/mocks.util';
import {Editorial} from '../../core/models/editorial';
import {authFactory} from '../../core/factories/auth.factory';
import {CoreModule} from '../../core/core.module';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {SharedModule} from '../../shared/shared.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('HerosService', () => {
  const apiConfig = MocksUtil.createMockedApiConfig();
  const expectedUrl = 'http://127.0.0.1:3000/api/heroes';
  const mockResponse = MocksUtil.createMockedHeroes();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: 'api.config', useValue: apiConfig},
        {provide: 'defaultLanguage', useValue: 'en'},
        {provide: 'AuthService', useFactory: authFactory, deps: [Http]},
        HeroService
      ],
      imports: [
        BrowserModule,
        CoreModule,
        SharedModule,
        HttpClientModule,
        HttpClientTestingModule
      ]
    });
  });

  it('should create an instance of the HeroService', inject([HeroService], (service: HeroService) => {
    expect(service).toBeTruthy();
  }));

  it('should get list of all heroes', async(inject([HeroService], (heroService) => {
    // mockBackend.connections.subscribe((connection: MockConnection) => {
    //   connection.mockRespond(new Response(new ResponseOptions({body: mockResponse})));
    // });

    heroService.findAll().subscribe((data) => {
      expect(data.length).toBe(3);
      expect(data[0].id).toBe(1);
      expect(data[0].name).toBe('Hero 1');
      expect(data[0].image).toBe('image 1.png');
    });
  })));

  it('should get hero by id', async(inject([HeroService], (service: HeroService) => {
    const id = 1;

    // mockBackend.connections.subscribe((connection: MockConnection) => {
    //   expect(connection.request.method).toBe(RequestMethod.Get);
    //   expect(connection.request.url).toEqual(expectedUrl + '/' + id);
    //   connection.mockRespond(new Response(new ResponseOptions({body: mockResponse[0]})));
    // });

    service.findById(id).subscribe((response: Hero) => {
      expect(response.id).toBe(1);
      expect(response.name).toBe('Hero 1');
      expect(response.image).toBe('image 1.png');
      expect(response.editorial).toBe(1);
    });
  })));

  it('should insert new Hero', async(inject([HeroService], (heroService) => {
    // mockBackend.connections.subscribe((connection: MockConnection) => {
    //   expect(connection.request.method).toBe(RequestMethod.Post);
    //   expect(connection.request.url).toEqual(expectedUrl);
    //   connection.mockRespond(new Response(new ResponseOptions({status: 201, body: mockResponse[1]})));
    // });
    const hero = new Hero(null, 'Hero new', 1, 'imageNew.jspg');
    heroService.insert(hero).subscribe((successResult) => {
      expect(successResult).toBeDefined();
      expect(successResult.id).toBe(1);
      expect(successResult.name).toBe('Hero new');
      expect(successResult.editorial).toBe(1);
      expect(successResult.image).toBe('imageNew.jspg');
    });
  })));

  it('should save updates to an existing hero', async(inject([HeroService], (service: HeroService) => {
    const id = 1;
    // mockBackend.connections.subscribe((connection: MockConnection) => {
    //   expect(connection.request.method).toBe(RequestMethod.Put);
    //   expect(connection.request.url).toEqual(expectedUrl + '/' + id);
    //   connection.mockRespond(new Response(new ResponseOptions({status: 204})));
    // });

    const hero = new Hero(1, 'Hero changed', 2, 'imageChanged.jspg');
    service.update('id', hero).subscribe((successResult) => {
      expect(successResult).toBeDefined();
      expect(successResult.id).toBe(1);
      expect(successResult.name).toBe('Hero changed');
      expect(successResult.editorial).toBe(2);
      expect(successResult.image).toBe('imageChanged.jspg');
    });
  })));

  it('should delete an existing Hero', async(inject([HeroService], (heroService) => {
    // mockBackend.connections.subscribe(connection => {
    //   expect(connection.request.method).toBe(RequestMethod.Delete);
    //   connection.mockRespond(new ResponseOptions({status: 204}));
    // });

    heroService.delete(1).subscribe(
      (successResult) => {
        expect(successResult).toBeDefined();
        expect(successResult.status).toBe(204);
      },
      (errorResult) => {
        throw (errorResult);
      });
  })));
});
