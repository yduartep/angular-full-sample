import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule, Http, ConnectionBackend, RequestOptions } from '@angular/http';
import { TestBed, async } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { Routes, Router, RouterModule, ActivatedRoute } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { OAuthService } from './core/services/oauth.service';
import { ApiConfig } from './core/models/api-config';

import { TranslateModule, TranslateLoader, TranslateService, TranslateStaticLoader } from 'ng2-translate/ng2-translate';
import { TranslateLoaderFactory } from './app.translate.factory';

const appTitle = 'Tour of Heroes and Villains';
export const fake_routes: Routes = [];

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        CoreModule,
        SharedModule,
        RouterTestingModule.withRoutes(fake_routes),
        TranslateModule.forRoot({
          provide: TranslateLoader,
          useFactory: TranslateLoaderFactory,
          deps: [Http]
        })
      ],
      providers: [
        { provide: 'AuthService', useClass: OAuthService },
        { provide: 'api.config', useValue: new ApiConfig() },
         { provide: 'cookie.user.id', useValue: 'userId' },
        { provide: 'cookie.token.id', useValue: 'token' },
        TranslateService
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title ${appTitle}`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual(appTitle);
  }));
});
