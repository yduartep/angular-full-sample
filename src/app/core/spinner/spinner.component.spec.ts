import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerComponent } from './spinner.component';
import { SpinnerState, SpinnerService } from './spinner.service';
import { LoggerService } from '../services/logger.service';
import { loggerFactory } from '../factories/logger.factory';
import { Subscription } from 'rxjs/Subscription';

describe('SpinnerComponent', () => {
  let component: SpinnerComponent;
  let fixture: ComponentFixture<SpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpinnerComponent ],
      providers: [ SpinnerService, { provide: 'LoggerService', useFactory: loggerFactory } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
