import {TestBed, inject} from '@angular/core/testing';

import {MocksService} from './mocks.service';
import {JsonFileService} from './json-file.service';
import {CoreModule} from '../core.module';
import {BrowserModule} from '@angular/platform-browser';
import {SharedModule} from '../../shared/shared.module';
import {APP_BASE_HREF} from '@angular/common';
import {MocksUtil} from '../utilities/mocks.util';

describe('MocksService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        CoreModule,
        SharedModule
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/'},
        {provide: 'api.config', useValue: MocksUtil.createMockedApiConfig()},
        {provide: 'defaultLanguage', useValue: 'en'},
        MocksService
      ]
    });
  });

  it('should ...', inject([MocksService], (service: MocksService) => {
    expect(service).toBeTruthy();
  }));
});
