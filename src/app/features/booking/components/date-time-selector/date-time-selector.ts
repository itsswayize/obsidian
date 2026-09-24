import { Component, Input, Output, EventEmitter, OnInit, ViewChild, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BusinessDataService } from '../../../../core/services/business-data';
import { BookingAvailability } from '../../../../core/services/booking-availability';
import { Service, Barber } from '../../../../core/models/booking.models';

@Component({
  selector: 'app-date-time-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './date-time-selector.html',
  styleUrl: './date-time-selector.scss'
})
export class DateTimeSelectorComponent implements OnInit {
  private businessData = inject(BusinessDataService);
  private availability = inject(BookingAvailability);

  @ViewChild('dateInput') private dateInput?: ElementRef<HTMLInputElement>;

  @Input({ required: true }) service!: Service;
  @Input({ required: true }) barber!: Barber;
  @Input() selectedDate = '';
  @Input() selectedTime = '';
  
  @Output() dateTimeSelected = new EventEmitter<{date: string, time: string}>();

  availableSlots: string[] = [];
  minDate: string = '';

  ngOnInit() {
    // SAST local date baseline
    const today = new Date();
    this.minDate = today.toLocaleDateString('en-CA'); // YYYY-MM-DD format
    
    if (this.selectedDate) {
      this.loadAvailableTimes(this.selectedDate);
    }
  }

  openDatePicker() {
    this.dateInput?.nativeElement.showPicker?.();
  }

  onDateChange(newDate: string) {
    this.selectedDate = newDate;
    this.selectedTime = ''; // Reset time when date changes
    this.loadAvailableTimes(this.selectedDate);
  }

  onTimeSelect(time: string) {
    this.selectedTime = time;
    this.dateTimeSelected.emit({ date: this.selectedDate, time: this.selectedTime });
  }

  private loadAvailableTimes(dateStr: string) {
    if (!dateStr) return;
    
    this.businessData.getBusinessHours().subscribe(hours => {
      this.businessData.getBookingsByDateAndBarber(dateStr, this.barber.id).subscribe(bookings => {
        this.availableSlots = this.availability.calculateAvailableSlots(
          dateStr, 
          this.service.durationMinutes, 
          hours, 
          bookings
        );
      });
    });
  }
}