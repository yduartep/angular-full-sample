import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegressionComponent } from './regression.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from '../../environments/environment.local';
import { Routes, ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';

describe('RegressionComponent', () => {
  let component: RegressionComponent;
  let fixture: ComponentFixture<RegressionComponent>;
  const apiConfig = environment.apiConfig;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegressionComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        CoreModule,
        SharedModule,
        RouterTestingModule.withRoutes([])
      ],
      providers: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegressionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create an instance of the component', () => {
    expect(component).toBeTruthy();
  });
});
