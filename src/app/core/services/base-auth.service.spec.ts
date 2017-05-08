import { TestBed, inject } from '@angular/core/testing';

import { BaseAuthService } from './base-auth.service';

describe('BaseAuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BaseAuthService]
    });
  });

  it('should ...', inject([BaseAuthService], (service: BaseAuthService) => {
    expect(service).toBeTruthy();
  }));
});
