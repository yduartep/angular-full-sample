import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Routes, Router, RouterModule, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Http, HttpModule } from '@angular/http';
import { DataTableModule } from 'angular2-datatable';

// models
import { ApiConfig } from '../../core/models/api-config';
import { ApiUrl } from '../../core/models/api-url';

// translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { createTranslateLoader } from '../../app.translate.factory';
import { TranslateService } from '@ngx-translate/core';

// factory and helpers
import { loggerFactory } from '../../core/factories/logger.factory';
import { AuthHelper } from '../../core/services/auth.helper';
import { MocksUtil } from '../../core/utilities/mocks.util';

// services
import { ProcessService } from '../../shared/service/process.service';
import { OAuthService } from '../../core/services/oauth.service';
import { LoggerService } from '../../core/services/logger.service';
import { SpinnerService } from '../../core/spinner/spinner.service';
import { MessageService } from '../../modal-message/message.service';

// components
import { ProcessListComponent } from './process-list.component';

// modules
import { SharedModule } from '../../shared/shared.module';

describe('ProcessListComponent', () => {
  let component: ProcessListComponent;
  let fixture: ComponentFixture<ProcessListComponent>;
  const apiConfig = MocksUtil.createMockedApiConfig();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProcessListComponent],
      imports: [
        HttpModule,
        SharedModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: (createTranslateLoader),
            deps: [Http]
          }
        }),
        DataTableModule,
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        { provide: 'api.config', useValue: apiConfig },
        { provide: 'AuthService', useClass: OAuthService },
        { provide: 'defaultLanguage', useValue: 'en' },
        ProcessService,
        { provide: 'LoggerService', useFactory: loggerFactory },
        SpinnerService,
        AuthHelper,
        MessageService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
