import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { XHRBackend, Http, RequestOptions } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Routes, ActivatedRoute, Router } from '@angular/router';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CoreModule } from '../../core/core.module';
import { OAuthService } from '../../core/services/oauth.service';
import { httpFactory } from '../../core/http.factory';
import { LoginComponent } from './login.component';
import { MocksUtil } from '../../core/utilities/mocks.util';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const expectedUrl = 'http://localhost:3000/api/oauth/token';
  const apiConfig = MocksUtil.createMockedApiConfig();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        CoreModule,
        SharedModule,
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        { provide: 'api.config', apiConfig },
        { provide: 'cookie.user.id', useValue: 'userId' },
        { provide: 'cookie.token.id', useValue: 'token' },
        { provide: Http, useFactory: httpFactory, deps: [XHRBackend, RequestOptions] }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create an instance of the component', () => {
    expect(component).toBeTruthy();
  });
});
