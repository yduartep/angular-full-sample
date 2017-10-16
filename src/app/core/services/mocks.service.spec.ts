import { TestBed, inject } from '@angular/core/testing';

import { MocksService } from './mocks.service';

describe('MocksService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MocksService]
    });
  });

  it('should ...', inject([MocksService], (service: MocksService) => {
    expect(service).toBeTruthy();
  }));
});
