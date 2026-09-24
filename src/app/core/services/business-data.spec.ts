import { TestBed } from '@angular/core/testing';

import { BusinessDataService } from './business-data';

describe('BusinessDataService', () => {
  let service: BusinessDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusinessDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
