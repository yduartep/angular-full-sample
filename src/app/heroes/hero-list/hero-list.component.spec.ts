import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Routes, ActivatedRoute, Router } from '@angular/router';

import { HeroListComponent } from './hero-list.component';
import { HeroService } from '../shared/hero.service';
import { SpinnerService } from '../../core/spinner/spinner.service';
import { LoggerService } from '../../core/services/logger.service';

export const fake_routes: Routes = [{path: 'Heros', component: HeroListComponent}];

describe('HeroListComponent', () => {
  let component: HeroListComponent;
  let fixture: ComponentFixture<HeroListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroListComponent ],
      providers: [ HeroService, SpinnerService, LoggerService ],
      imports: [ RouterTestingModule.withRoutes(fake_routes), HttpModule ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
