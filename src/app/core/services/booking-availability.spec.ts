import { TestBed } from '@angular/core/testing';

import { BookingAvailability } from './booking-availability';

describe('BookingAvailability', () => {
  let service: BookingAvailability;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingAvailability);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
