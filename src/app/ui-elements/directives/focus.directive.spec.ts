import {NO_ERRORS_SCHEMA} from '@angular/core';
import {TestBed, async, inject} from '@angular/core/testing';
import {FocusDirective} from './focus.directive';
import {ElementRef} from '@angular/core';
import {HttpModule} from '@angular/http';
import {RouterTestingModule} from '@angular/router/testing';

// factory and helpers
import {loggerFactory} from '../../core/factories/logger.factory';
import {AuthHelper} from '../../core/services/auth.helper';
import {MocksUtil} from '../../core/utilities/mocks.util';

// services
import {OAuthService} from '../../core/services/oauth.service';
import {LoggerService} from '../../core/services/logger.service';
import {SpinnerService} from '../../core/spinner/spinner.service';

class MockElementRef implements ElementRef {
  nativeElement = {};
}

describe('FocusDirective', () => {
  const apiConfig = MocksUtil.createMockedApiConfig();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        HttpModule,
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        {provide: 'api.config', useValue: apiConfig},
        {provide: 'cookie.user.id', useValue: 'backUserId'},
        {provide: 'cookie.token.id', useValue: 'backToken'},
        {provide: 'defaultLanguage', useValue: 'en'},
        {provide: 'AuthService', useClass: OAuthService},
        {provide: 'LoggerService', useFactory: loggerFactory},
        {provide: ElementRef, useValue: new MockElementRef()},
        SpinnerService,
        AuthHelper
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  it('should create an instance', inject([ElementRef], (element: ElementRef) => {
    const directive = new FocusDirective(element);
    expect(directive).toBeTruthy();
  }));
});
