import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Http } from '@angular/http';

import { TranslateModule, TranslateLoader, TranslateService, TranslateStaticLoader } from 'ng2-translate/ng2-translate';
import { TranslateLoaderFactory } from '../../app.translate.factory';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { NavComponent } from './nav.component';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        SharedModule,
        RouterTestingModule.withRoutes([]),
        TranslateModule.forRoot({
          provide: TranslateLoader,
          useFactory: TranslateLoaderFactory,
          deps: [Http]
        })
      ],
      providers: [
        TranslateService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
