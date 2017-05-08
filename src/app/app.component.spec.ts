import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule, Http, ConnectionBackend, RequestOptions } from '@angular/http';
import { TestBed, async } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { Routes, Router, RouterModule, ActivatedRoute } from '@angular/router';
import { HagueSharedModule } from '@hague/shared';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

/*
import { HagueCoreModule } from './core/core.module';
import { AuthenticationService } from './core/services/authentication.service';
import { ApiConfig } from './core/models/api-config';
*/
import { HagueCoreModule, AuthenticationService, ApiConfig } from '@hague/core';

const appTitle = 'E-filing Front Office';
export const fake_routes: Routes = [];

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        HagueCoreModule,
        HagueSharedModule,
        RouterTestingModule.withRoutes(fake_routes)
      ],
      providers: [
        AuthenticationService,
        { provide: 'api.config', useValue: new ApiConfig() }
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
