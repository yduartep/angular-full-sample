import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Routes, ActivatedRoute, Router } from '@angular/router';
import { HttpModule } from '@angular/http';

import { VillainListComponent } from './villain-list.component';
import { VillainService } from '../shared/villain.service';

export const fake_routes = [];

describe('VillainListComponent', () => {
  let component: VillainListComponent;
  let fixture: ComponentFixture<VillainListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VillainListComponent],
      providers: [VillainService],
      imports: [RouterTestingModule.withRoutes(fake_routes), HttpModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VillainListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
