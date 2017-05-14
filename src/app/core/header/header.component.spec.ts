import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { createTranslateLoader } from '../../app.translate.factory';
import { TranslateService } from '@ngx-translate/core';
import { OAuthService } from '../services/oauth.service';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { loggerFactory } from '../factories/logger.factory';
import { LoggerService } from '../services/logger.service';
import { SpinnerService } from '../spinner/spinner.service';
import { AuthHelper } from '../services/auth.helper';
import { HeaderComponent } from './header.component';
import { MocksUtil } from '../../core/utilities/mocks.util';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  const apiConfig = MocksUtil.createMockedApiConfig();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        HttpModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: (createTranslateLoader),
            deps: [Http]
          }
        }),
        SharedModule,
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        { provide: 'LoggerService', useFactory: loggerFactory },
        { provide: 'api.config', useValue: apiConfig },
        { provide: 'AuthService', useClass: OAuthService },
        { provide: 'defaultLanguage', useValue: 'en' },
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
