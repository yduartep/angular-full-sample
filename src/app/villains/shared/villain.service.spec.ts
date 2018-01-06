import { TestBed, getTestBed, async, inject } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions, Response, HttpModule, Http, XHRBackend, RequestMethod, ResponseOptions } from '@angular/http';
import { Villain } from './villain';
import { VillainService } from './villain.service';
import { MocksUtil } from '../../core/utilities/mocks.util';
import {authFactory} from '../../core/factories/auth.factory';
import {BrowserModule} from '@angular/platform-browser';
import {SharedModule} from '../../shared/shared.module';
import {CoreModule} from '../../core/core.module';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('VillainsService', () => {
  const apiConfig = MocksUtil.createMockedApiConfig();
  const expectedUrl = 'http://127.0.0.1:3000/api/villains';
  const mockResponse = MocksUtil.createMockedVillains();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: 'api.config', useValue: apiConfig},
        {provide: 'defaultLanguage', useValue: 'en'},
        {provide: 'AuthService', useFactory: authFactory, deps: [Http]},
        VillainService
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

  it('should create an instance of the VillainService', inject([VillainService], (service: VillainService) => {
    expect(service).toBeTruthy();
  }));

  it('should get list of all villains', async(inject([VillainService], (service: VillainService) => {
    // mockBackend.connections.subscribe((connection: MockConnection) => {
    //   connection.mockRespond(new Response(new ResponseOptions({ body: mockResponse })));
    // });

    service.findAll().subscribe((data) => {
      expect(data.length).toBe(3);
      expect(data[0].id).toBe(1);
      expect(data[0].name).toBe('Villain 1');
      expect(data[0].image).toBe('image 1.png');
    });
  })));

  it('should get villain by id', async(inject([VillainService], (service: VillainService) => {
    const id = 1;

    // mockBackend.connections.subscribe((connection: MockConnection) => {
    //   expect(connection.request.method).toBe(RequestMethod.Get);
    //   expect(connection.request.url).toEqual(expectedUrl + '/' + id);
    //   connection.mockRespond(new Response(new ResponseOptions({ body: mockResponse[0] })));
    // });

    service.findById(id).subscribe((response: Villain) => {
      expect(response.id).toBe(1);
      expect(response.name).toBe('Villain 1');
      expect(response.image).toBe('image 1.png');
      expect(response.editorial).toBe(1);
    });
  })));

  it('should insert new villain', async(inject([VillainService], (service: VillainService) => {
    // mockBackend.connections.subscribe((connection: MockConnection) => {
    //   expect(connection.request.method).toBe(RequestMethod.Post);
    //   expect(connection.request.url).toEqual(expectedUrl);
    //   connection.mockRespond(new Response(new ResponseOptions({ status: 201, body: mockResponse[1] })));
    // });
    const villain = new Villain(null, 'Villain new', 1, 'imageNew.jspg');
    service.insert(villain).subscribe((successResult) => {
      expect(successResult).toBeDefined();
      expect(successResult.id).toBe(1);
      expect(successResult.name).toBe('Villain changed');
      expect(successResult.editorial).toBe(1);
      expect(successResult.image).toBe('imageChanged.jspg');
    });
  })));

  it('should save updates to an existing villain', async(inject([VillainService], (service: VillainService) => {
    const id = 1;
    // mockBackend.connections.subscribe((connection: MockConnection) => {
    //   expect(connection.request.method).toBe(RequestMethod.Put);
    //   expect(connection.request.url).toEqual(expectedUrl + '/' + id);
    //   connection.mockRespond(new Response(new ResponseOptions({ status: 204 })));
    // });

    const villain = new Villain(1, 'Villain changed', 1, 'imageChanged.jspg');
    service.update('id', villain).subscribe((successResult) => {
      expect(successResult).toBeDefined();
      expect(successResult.id).toBe(1);
      expect(successResult.name).toBe('Villain changed');
      expect(successResult.editorial).toBe(1);
      expect(successResult.image).toBe('imageChanged.jspg');
    });
  })));

  it('should delete an existing villain', async(inject([VillainService], (service: VillainService) => {
    // mockBackend.connections.subscribe(connection => {
    //   expect(connection.request.method).toBe(RequestMethod.Delete);
    //   connection.mockRespond(new ResponseOptions({ status: 204 }));
    // });

    service.delete(1).subscribe(
      (successResult) => {
        expect(successResult).toBeDefined();
        expect(successResult.id).toBe(1);
      },
      (errorResult) => {
        throw (errorResult);
      });
  })));
});
