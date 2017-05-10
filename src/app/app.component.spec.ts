import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { HttpModule, Http, ConnectionBackend, RequestOptions } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Routes, Router, RouterModule, ActivatedRoute } from '@angular/router';

import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { ApiConfig } from './core/models/api-config';
import { OAuthService } from './core/services/oauth.service';
import { MocksUtil } from './core/utilities/mocks.util';
import { AppComponent } from './app.component';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { createTranslateLoader } from './app.translate.factory';
// import { TranslateService } from '@ngx-translate/core';

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
        HttpModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: (createTranslateLoader),
            deps: [Http]
          }
        }),
        SharedModule,
        CoreModule,
        RouterTestingModule.withRoutes(fake_routes)
      ],
      providers: [
        { provide: 'AuthService', useClass: OAuthService },
        { provide: 'api.config', useValue: new ApiConfig() },
        { provide: 'cookie.user.id', useValue: 'userId' },
        { provide: 'cookie.token.id', useValue: 'token' }/*,
        TranslateService*/
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
