import { TestBed, inject } from '@angular/core/testing';

import { SpinnerService } from './spinner.service';
import { Subject } from 'rxjs/Subject';

describe('SpinnerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpinnerService]
    });
  });

  it('should ...', inject([SpinnerService], (service: SpinnerService) => {
    expect(service).toBeTruthy();
  }));
});
