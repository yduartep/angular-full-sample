import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RouterTestingModule} from '@angular/router/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {createTranslateLoader} from '../../app.translate.factory';
import {OAuthService} from '../services/oauth.service';
import {SharedModule} from '../../shared/shared.module';
import {loggerFactory} from '../factories/logger.factory';
import {LoggerService} from '../services/logger.service';
import {SpinnerService} from '../spinner/spinner.service';
import {AuthHelper} from '../services/auth.helper';
import {HeaderComponent} from './header.component';
import {MocksUtil} from '../../core/utilities/mocks.util';
import {HttpClient} from '@angular/common/http';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  const apiConfig = MocksUtil.createMockedApiConfig();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: (createTranslateLoader),
            deps: [HttpClient]
          }
        }),
        SharedModule,
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        {provide: 'LoggerService', useFactory: loggerFactory},
        {provide: 'api.config', useValue: apiConfig},
        {provide: 'AuthService', useClass: OAuthService},
        {provide: 'defaultLanguage', useValue: 'en'},
        SpinnerService,
        AuthHelper
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
