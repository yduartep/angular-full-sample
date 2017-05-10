import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Routes, ActivatedRoute, Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';

import { SharedModule } from '../../shared/shared.module';
import { MocksUtil } from '../../core/utilities/mocks.util';
import { VillainDetailComponent } from './villain-detail.component';
import { VillainService } from '../shared/villain.service';

export const fake_routes: Routes = [{ path: 'detail/:id', component: VillainDetailComponent }];

describe('VillainDetailComponent', () => {
  let component: VillainDetailComponent;
  let fixture: ComponentFixture<VillainDetailComponent>;
  const apiConfig = MocksUtil.createMockedApiConfig();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        SharedModule,
        RouterTestingModule.withRoutes([])
      ],
      declarations: [VillainDetailComponent],
      providers: [
        { provide: 'api.config', useValue: apiConfig },
        { provide: 'cookie.user.id', useValue: 'backUserId' },
        { provide: 'cookie.token.id', useValue: 'backToken' },
        VillainService
      ],
      schemas: [NO_ERRORS_SCHEMA]

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
