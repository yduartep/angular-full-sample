import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VillainsComponent } from './villains.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from '../../environments/environment';
import { Routes, ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';

describe('VillainsComponent', () => {
  let component: VillainsComponent;
  let fixture: ComponentFixture<VillainsComponent>;
  const apiConfig = environment.apiConfig;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VillainsComponent ],
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
    fixture = TestBed.createComponent(VillainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create an instance of the component', () => {
    expect(component).toBeTruthy();
  });
});
