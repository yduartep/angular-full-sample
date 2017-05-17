import { TestBed, getTestBed, async, inject } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Headers, BaseRequestOptions, Response, HttpModule, Http, XHRBackend, RequestMethod, ResponseOptions } from '@angular/http';
import { Process } from './process';
import { ProcessService } from './process.service';
import { MocksUtil } from '../../core/utilities/mocks.util';
import {Activity} from './activity';
import {Task} from './task';


describe('ProcesssService', () => {
  let mockBackend: MockBackend;
  const apiConfig = MocksUtil.createMockedApiConfig();
  const expectedUrl = 'http://127.0.0.1:3000/api/process';
  const mockResponse = MocksUtil.createMockedProcess();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: 'api.config', useValue: apiConfig },
        { provide: 'defaultLanguage', useValue: 'en' },
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          deps: [MockBackend, BaseRequestOptions],
          useFactory: (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          }
        },
        ProcessService
      ],
      imports: [HttpModule]
    });
    mockBackend = getTestBed().get(MockBackend);
  });

  it('should create an instance of the ProcessService', inject([ProcessService], (service: ProcessService) => {
    expect(service).toBeTruthy();
  }));

  it('should get list of all process', async(inject([ProcessService], (processService) => {
    mockBackend.connections.subscribe((connection: MockConnection) => {
      connection.mockRespond(new Response(new ResponseOptions({ body: mockResponse })));
    });

    processService.findAll().subscribe((data) => {
      expect(data.length).toBe(3);
      expect(data[0].id).toBe(1);
      expect(data[0].name).toBe('Process 1');
      expect(data[0].image).toBe('image 1.png');
    });
  })));

  it('should get process by id', async(inject([ProcessService], (service: ProcessService) => {
    const id = 1;

    mockBackend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.method).toBe(RequestMethod.Get);
      expect(connection.request.url).toEqual(expectedUrl + '/' + id);
      connection.mockRespond(new Response(new ResponseOptions({ body: mockResponse[0] })));
    });

    service.findById(id).subscribe((response: Process) => {
      expect(response.processInstanceId).toBe(1);
      expect(response.executionId).toBe('Process 1');
    });
  })));

  it('should insert new Process', async(inject([ProcessService], (processService) => {
    mockBackend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.method).toBe(RequestMethod.Post);
      expect(connection.request.url).toEqual(expectedUrl);
      connection.mockRespond(new Response(new ResponseOptions({ status: 201, body: mockResponse[1] })));
    });
    const activity = new Activity('idTask', 'name', new Date());
    const tasks = Array<Task>();
    const processVariables = new Map<string, any>();
    const process = new Process('executionId', 'processInstanceId', 'processKey', 'processDefinitionId',
      'diagramURL', 'tenantId', activity, tasks, processVariables);
    processService.insert(process).subscribe((successResult) => {
      expect(successResult).toBeDefined();
      expect(successResult.status).toBe(201);
      expect(successResult.ok).toBe(true);
    });
  })));

  it('should save updates to an existing process', async(inject([ProcessService], (service: ProcessService) => {
    const id = 1;
    mockBackend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.method).toBe(RequestMethod.Put);
      expect(connection.request.url).toEqual(expectedUrl + '/' + id);
      connection.mockRespond(new Response(new ResponseOptions({ status: 204 })));
    });

    const activity = new Activity('idTask', 'name', new Date());
    const tasks = Array<Task>();
    const processVariables = new Map<string, any>();
    const process = new Process('executionId', 'processInstanceId', 'processKey', 'processDefinitionId',
      'diagramURL', 'tenantId', activity, tasks, processVariables);
    service.update('id', process).subscribe((successResult) => {
      expect(successResult).toBeDefined();
      expect(successResult.status).toBe(204);
      expect(successResult.ok).toBe(true);
    });
  })));

  it('should delete an existing Process', async(inject([ProcessService], (processService) => {
    mockBackend.connections.subscribe(connection => {
      expect(connection.request.method).toBe(RequestMethod.Delete);
      connection.mockRespond(new ResponseOptions({ status: 204 }));
    });

    processService.delete(1).subscribe(
      (successResult) => {
        expect(successResult).toBeDefined();
        expect(successResult.status).toBe(204);
      },
      (errorResult) => {
        throw (errorResult);
      });
  })));
});
