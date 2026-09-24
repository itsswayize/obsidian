import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateTimeSelectorComponent } from './date-time-selector';

describe('DateTimeSelector', () => {
  let component: DateTimeSelectorComponent;
  let fixture: ComponentFixture<DateTimeSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateTimeSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DateTimeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
