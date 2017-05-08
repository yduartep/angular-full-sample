import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Routes, ActivatedRoute, Router } from '@angular/router';
import { HttpModule } from '@angular/http';

import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from '../shared/hero.service';

export const fake_routes: Routes = [{path: 'detail/:id', component: HeroDetailComponent}];

describe('heroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroDetailComponent ],
      providers: [ HeroService ],
      imports: [ RouterTestingModule.withRoutes(fake_routes), HttpModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
