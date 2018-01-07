import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AlertComponent} from './alert.component';
import {BrowserModule} from '@angular/platform-browser';
import {CoreModule} from '../core.module';
import {AlertService} from './alert.service';
import {SharedModule} from '../../shared/shared.module';
import {TranslateModule} from '@ngx-translate/core';
import {RouterModule} from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';
import {MocksUtil} from '../utilities/mocks.util';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        BrowserModule,
        CoreModule,
        SharedModule,
        TranslateModule.forRoot(),
        RouterModule.forRoot([])
      ],
      providers: [AlertService,
        {provide: APP_BASE_HREF, useValue: '/'},
        {provide: 'api.config', useValue: MocksUtil.createMockedApiConfig()},
        {provide: 'defaultLanguage', useValue: 'en'}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
