import {async, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {BrowserModule} from '@angular/platform-browser';
import {APP_BASE_HREF} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {RouterModule} from '@angular/router';
import {EffectsModule} from '@ngrx/effects';
import {SharedModule} from './shared/shared.module';
import {CoreModule} from './core/core.module';
import {MocksUtil} from './core/utilities/mocks.util';
import {MessageService} from './modal-message/message.service';
import {TranslateModule} from '@ngx-translate/core';
import {ServiceWorkerModule, SwUpdate} from '@angular/service-worker';

describe('AppComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        CoreModule,
        SharedModule,
        TranslateModule.forRoot(),
        RouterModule.forRoot([]),
        StoreModule,
        EffectsModule,
        ServiceWorkerModule.register('./ngsw-worker.js', {enabled: false})
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/'},
        {provide: 'api.config', useValue: MocksUtil.createMockedApiConfig()},
        {provide: 'defaultLanguage', useValue: 'en'},
        MessageService,
        SwUpdate
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));
});
