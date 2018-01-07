import {inject, TestBed} from '@angular/core/testing';

import {loggerFactory} from '../factories/logger.factory';
import {LoggerService} from './logger.service';
import {ConsoleLoggerService} from './console-logger.service';

describe('ConsoleLoggerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: 'LoggerService', useFactory: loggerFactory},
        ConsoleLoggerService
      ]
    });
  });

  it('should ...', inject([ConsoleLoggerService], (service: LoggerService) => {
    expect(service).toBeTruthy();
  }));
});
