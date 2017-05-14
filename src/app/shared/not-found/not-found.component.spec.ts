import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNotFoundComponent } from './not-found.component';
import { LoggerService } from '../../core/services/logger.service';
import { loggerFactory } from '../../core/factories/logger.factory';

describe('NotFoundComponent', () => {
  let component: PageNotFoundComponent;
  let fixture: ComponentFixture<PageNotFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PageNotFoundComponent],
      providers: [{ provide: 'LoggerService', useFactory: loggerFactory }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
