import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';

import { SharedModule } from '../../shared/shared.module';
import { MocksUtil } from '../../core/utilities/mocks.util';
import { VillainSearchComponent } from './villain-search.component';
import { VillainService } from '../shared/villain.service';

describe('VillainSearchComponent', () => {
  let component: VillainSearchComponent;
  let fixture: ComponentFixture<VillainSearchComponent>;
  const apiConfig = MocksUtil.createMockedApiConfig();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        SharedModule,
        RouterTestingModule.withRoutes([])
      ],
      declarations: [VillainSearchComponent],
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
    fixture = TestBed.createComponent(VillainSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
