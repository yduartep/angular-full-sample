import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Routes, Router, RouterModule, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../../shared/shared.module';
import { HeroListComponent } from './hero-list.component';
import { HeroService } from '../shared/hero.service';
import { OAuthService } from '../../core/services/oauth.service';
import { ApiConfig } from '../../core/models/api-config';
import { ApiUrl } from '../../core/models/api-url';
import { MocksUtil } from '../../core/utilities/mocks.util';
import { Http, HttpModule } from '@angular/http';
import { DataTableModule } from 'angular2-datatable';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { createTranslateLoader } from '../../app.translate.factory';
import { TranslateService } from '@ngx-translate/core';

import { loggerFactory } from '../../core/factories/logger.factory';
import { LoggerService } from '../../core/services/logger.service';
import { SpinnerService } from '../../core/spinner/spinner.service';

describe('HeroListComponent', () => {
  let component: HeroListComponent;
  let fixture: ComponentFixture<HeroListComponent>;
  const apiConfig = MocksUtil.createMockedApiConfig();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeroListComponent],
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
        HeroService,
        { provide: 'LoggerService', useFactory: loggerFactory },
        SpinnerService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
