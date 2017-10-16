import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { HttpModule, Http, ConnectionBackend, RequestOptions } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Routes, Router, RouterModule, ActivatedRoute } from '@angular/router';

// translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { createTranslateLoader } from '../app.translate.factory';

// modules
import { SharedModule } from '../shared/shared.module';

// models
import { ApiConfig } from '../core/models/api-config';

// factory and helpers
import { loggerFactory } from '../core/factories/logger.factory';
import { AuthHelper } from '../core/services/auth.helper';
import { MocksUtil } from '../core/utilities/mocks.util';

// services
import { OAuthService } from '../core/services/oauth.service';
import { LoggerService } from '../core/services/logger.service';
import { SpinnerService } from '../core/spinner/spinner.service';
import { MessageService } from '../modal-message/message.service';

// components
import { ModalMessageComponent } from './modal-message.component';

describe('ModalMessageComponent', () => {
  let component: ModalMessageComponent;
  let fixture: ComponentFixture<ModalMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      schemas: [ NO_ERRORS_SCHEMA ],
      imports: [
        SharedModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: (createTranslateLoader),
            deps: [ Http ]
          }
        }),
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        { provide: 'AuthService', useClass: OAuthService },
        { provide: 'api.config', useValue: new ApiConfig() },
        { provide: 'defaultLanguage', useValue: 'en' },
        { provide: 'LoggerService', useFactory: loggerFactory },
        MessageService,
        SpinnerService,
        AuthHelper
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
