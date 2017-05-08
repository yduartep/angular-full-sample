import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from '../../../environments/environment';

import { LoginComponent } from './login.component';
import { Routes, ActivatedRoute, Router } from '@angular/router';
import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../../shared/shared.module';
import { OAuthService } from '../../core/services/oauth.service';
import { COOKIE_IDENTIFIERS } from '../../cookie.identifiers';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const apiConfig = environment.apiConfig;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        CoreModule,
        SharedModule,
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        { provide: 'api.config', useValue: apiConfig },
        { provide: 'cookie.user.id', useValue: COOKIE_IDENTIFIERS.USER_ID },
        { provide: 'cookie.token.id', useValue: COOKIE_IDENTIFIERS.TOKEN_ID },
        { provide: 'AuthService', useClass: OAuthService }
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
