import { TestBed, getTestBed, async, inject } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Headers, BaseRequestOptions, Response, HttpModule, Http, XHRBackend, RequestMethod, ResponseOptions } from '@angular/http';
import { Hero } from './hero';
import { HeroService } from './hero.service';

describe('HerosService', () => {
  let mockBackend: MockBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HeroService,
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

  it('should create an instance of the HeroService', inject([HeroService], (service: HeroService) => {
    expect(service).toBeTruthy();
  }));

  it('should get list of all Heros', async(inject([HeroService], (HeroService) => {
      const mockResponse = [
        { id: '1', name: 'Hero 1', image: 'image1.png' },
        { id: '2', name: 'Hero 2', image: 'image2.png' }
      ];
      mockBackend.connections.subscribe((connection: MockConnection) => {
        connection.mockRespond(new Response(new ResponseOptions({ body: mockResponse })));
      });

      HeroService.findAll().subscribe((data) => {
          expect(data.length).toBe(2);
          expect(data[0].id).toBe('1');
          expect(data[0].name).toBe('Hero 1');
          expect(data[0].image).toBe('image1.png');
      });
  })));

  it('should get Hero by id', async(inject([HeroService], (HeroService) => {
      const mockResponse = { id: '1', name: 'Hero 1', image: 'image1.png' };

      mockBackend.connections.subscribe((connection: MockConnection) => {
        // make sure the URL is correct
        expect(connection.request.url).toMatch(/\/api\/Hero\/1/);
        connection.mockRespond(new Response(new ResponseOptions({ body: mockResponse })));
      });

      HeroService.findById('1').subscribe((Hero: Hero) => {
          expect(Hero.id).toBe('1');
          expect(Hero.name).toBe('Hero 1');
          expect(Hero.image).toBe('image1.png');
      });
  })));

  it('should insert new Hero', async(inject([HeroService], (HeroService) => {
      mockBackend.connections.subscribe((connection: MockConnection) => {
        // is it the correct REST type for an insert? (POST)
        expect(connection.request.method).toBe(RequestMethod.Post);
        // if ok
        connection.mockRespond(new Response(new ResponseOptions({status: 201})));
      });
      let Hero = new Hero(null, 'Hero new', 'imageNew.jspg');
      HeroService.save(Hero).subscribe((successResult) => {
          expect(successResult).toBeDefined();
          expect(successResult.status).toBe(201);
          expect(successResult.ok).toBe(true);
        });
    })));

    it('should save updates to an existing Hero', async(inject([HeroService], (HeroService) => {
        mockBackend.connections.subscribe((connection: MockConnection) => {
          // is it the correct REST type for update? (PUT)
          expect(connection.request.method).toBe(RequestMethod.Put);
          // if ok
          connection.mockRespond(new Response(new ResponseOptions({status: 204})));
        });

        let Hero = new Hero("1", 'Hero changed', 'imageChanged.jspg');
        HeroService.save(Hero).subscribe((successResult) => {
            expect(successResult).toBeDefined();
            expect(successResult.status).toBe(204);
            expect(successResult.ok).toBe(true);
          });
      })));

    it('should delete an existing Hero', async(inject([HeroService], (HeroService) => {
      mockBackend.connections.subscribe(connection => {
        expect(connection.request.method).toBe(RequestMethod.Delete);
        connection.mockRespond(<Response>new ResponseOptions({status: 204}));
      });

      HeroService.delete('1').subscribe(
        (successResult) => {
          expect(successResult).toBeDefined();
          expect(successResult.status).toBe(204);
        },
        (errorResult) => {
          throw (errorResult);
        });
    })));
});
