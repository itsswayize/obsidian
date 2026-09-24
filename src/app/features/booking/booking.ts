import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { BookingStateService, BookingState } from './services/booking-state';
import { CalendarService } from '../../core/services/calendar';
import { ServiceSelectorComponent } from './components/service-selector/service-selector';
import { BarberSelectorComponent } from './components/barber-selector/barber-selector';
import { DateTimeSelectorComponent } from './components/date-time-selector/date-time-selector';
import { CustomerFormComponent } from './components/customer-form/customer-form';
import { Service, Barber, Customer, Booking } from '../../core/models/booking.models';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,
    ServiceSelectorComponent, 
    BarberSelectorComponent, 
    DateTimeSelectorComponent, 
    CustomerFormComponent
  ],
  templateUrl: './booking.html',
  styleUrl: './booking.scss'
})
export class BookingComponent implements OnInit {
  private bookingStateService = inject(BookingStateService);
  private calendarService = inject(CalendarService);

  state$!: Observable<BookingState>;
  isSubmitting = false;
  finalBooking: Booking | null = null;

  ngOnInit() {
    this.state$ = this.bookingStateService.state$;
  }

  onServiceSelected(service: Service) { this.bookingStateService.setService(service); }
  onBarberSelected(barber: Barber) { this.bookingStateService.setBarber(barber); }
  onDateTimeSelected(event: {date: string, time: string}) { this.bookingStateService.setDateAndTime(event.date, event.time); }
  onCustomerSubmitted(customer: Customer) { this.bookingStateService.setCustomer(customer); }

  goToStep(step: number, state: BookingState) {
    // Only allow navigating back to completed steps
    if (step < state.step) {
      this.bookingStateService.goToStep(step);
    }
  }

  private calculateEndTime(startTime: string, durationMinutes: number): string {
    const [hours, minutes] = startTime.split(':').map(Number);
    const date = new Date(0, 0, 0, hours, minutes + durationMinutes);
    const h = date.getHours().toString().padStart(2, '0');
    const m = date.getMinutes().toString().padStart(2, '0');
    return `${h}:${m}`;
  }

  confirmBooking(state: BookingState) {
    if (this.isSubmitting) return;
    this.isSubmitting = true;

    // Simulate network delay
    setTimeout(() => {
      this.finalBooking = {
        service: state.service!,
        barber: state.barber!,
        date: state.date,
        startTime: state.time,
        endTime: this.calculateEndTime(state.time, state.service!.durationMinutes),
        customer: state.customer!
      };
      this.bookingStateService.goToStep(6); // Step 6: Confirmation
      this.isSubmitting = false;
    }, 1500);
  }

  addToGoogleCalendar() {
    if (this.finalBooking) {
      window.open(this.calendarService.generateGoogleCalendarUrl(this.finalBooking), '_blank');
    }
  }

  downloadAppleCalendar() {
    if (this.finalBooking) {
      this.calendarService.generateAppleCalendarIcs(this.finalBooking);
    }
  }

  resetBooking() {
    this.bookingStateService.reset();
    this.finalBooking = null;
  }
}