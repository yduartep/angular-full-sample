import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Routes, ActivatedRoute, Router } from '@angular/router';
import { HttpModule } from '@angular/http';

import { VillainDetailComponent } from './villain-detail.component';
import { VillainService } from '../shared/villain.service';

export const fake_routes: Routes = [{path: 'detail/:id', component: VillainDetailComponent}];

describe('VillainDetailComponent', () => {
  let component: VillainDetailComponent;
  let fixture: ComponentFixture<VillainDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VillainDetailComponent ],
      providers: [ VillainService ],
      imports: [ RouterTestingModule.withRoutes(fake_routes), HttpModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VillainDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
