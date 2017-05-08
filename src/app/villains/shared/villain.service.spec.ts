import { TestBed, getTestBed, async, inject } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Headers, BaseRequestOptions, Response, HttpModule, Http, XHRBackend, RequestMethod, ResponseOptions } from '@angular/http';
import { Villain } from './villain';
import { VillainService } from './villain.service';

describe('VillainsService', () => {
  let mockBackend: MockBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        VillainService,
        MockBackend,
        BaseRequestOptions,
        {
              provide: Http,
              deps: [MockBackend, BaseRequestOptions],
              useFactory: (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
                  return new Http(backend, defaultOptions);
              }
         }],
         imports: [HttpModule]
    });
    mockBackend = getTestBed().get(MockBackend);
  });

  it('should create an instance of the VillainService', inject([VillainService], (service: VillainService) => {
    expect(service).toBeTruthy();
  }));

  it('should get list of all Villains', async(inject([VillainService], (VillainService) => {
      const mockResponse = [
        { id: '1', name: 'Villain 1', image: 'image1.png' },
        { id: '2', name: 'Villain 2', image: 'image2.png' }
      ];
      mockBackend.connections.subscribe((connection: MockConnection) => {
        connection.mockRespond(new Response(new ResponseOptions({ body: mockResponse })));
      });

      VillainService.findAll().subscribe((data) => {
          expect(data.length).toBe(2);
          expect(data[0].id).toBe('1');
          expect(data[0].name).toBe('Villain 1');
          expect(data[0].image).toBe('image1.png');
      });
  })));

  it('should get Villain by id', async(inject([VillainService], (VillainService) => {
      const mockResponse = { id: '1', name: 'Villain 1', image: 'image1.png' };

      mockBackend.connections.subscribe((connection: MockConnection) => {
        // make sure the URL is correct
        expect(connection.request.url).toMatch(/\/api\/Villain\/1/);
        connection.mockRespond(new Response(new ResponseOptions({ body: mockResponse })));
      });

      VillainService.findById('1').subscribe((Villain: Villain) => {
          expect(Villain.id).toBe('1');
          expect(Villain.name).toBe('Villain 1');
          expect(Villain.image).toBe('image1.png');
      });
  })));

  it('should insert new Villain', async(inject([VillainService], (villainService) => {
      mockBackend.connections.subscribe((connection: MockConnection) => {
        // is it the correct REST type for an insert? (POST)
        expect(connection.request.method).toBe(RequestMethod.Post);
        // if ok
        connection.mockRespond(new Response(new ResponseOptions({status: 201})));
      });
      const villain = new Villain(null, 'Villain new', 1, 'imageNew.jspg');
      villainService.save(villain).subscribe((successResult) => {
          expect(successResult).toBeDefined();
          expect(successResult.status).toBe(201);
          expect(successResult.ok).toBe(true);
        });
    })));

    it('should save updates to an existing Villain', async(inject([VillainService], (villainService) => {
        mockBackend.connections.subscribe((connection: MockConnection) => {
          // is it the correct REST type for update? (PUT)
          expect(connection.request.method).toBe(RequestMethod.Put);
          // if ok
          connection.mockRespond(new Response(new ResponseOptions({status: 204})));
        });

        const villain = new Villain(1, 'Villain changed', 1, 'imageChanged.jspg');
        villainService.save(villain).subscribe((successResult) => {
            expect(successResult).toBeDefined();
            expect(successResult.status).toBe(204);
            expect(successResult.ok).toBe(true);
          });
      })));

    it('should delete an existing Villain', async(inject([VillainService], (VillainService) => {
      mockBackend.connections.subscribe(connection => {
        expect(connection.request.method).toBe(RequestMethod.Delete);
        connection.mockRespond(<Response>new ResponseOptions({status: 204}));
      });

      VillainService.delete('1').subscribe(
        (successResult) => {
          expect(successResult).toBeDefined();
          expect(successResult.status).toBe(204);
        },
        (errorResult) => {
          throw (errorResult);
        });
    })));
});
