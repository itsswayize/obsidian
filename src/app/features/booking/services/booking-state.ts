import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Service, Barber, Customer } from '../../../core/models/booking.models';

export interface BookingState {
  step: number;
  service: Service | null;
  barber: Barber | null;
  date: string;
  time: string;
  customer: Customer | null;
}

const initialState: BookingState = {
  step: 1,
  service: null,
  barber: null,
  date: '',
  time: '',
  customer: null
};

@Injectable({
  providedIn: 'root'
})
export class BookingStateService {
  private state = new BehaviorSubject<BookingState>(initialState);
  state$ = this.state.asObservable();

  updateState(updates: Partial<BookingState>) {
    this.state.next({ ...this.state.value, ...updates });
  }

  setService(service: Service) {
    // Moving to step 2; reset time in case service duration changed
    this.updateState({ service, step: 2, time: '' }); 
  }

  setBarber(barber: Barber) {
    // Moving to step 3; reset time in case barber schedule changed
    this.updateState({ barber, step: 3, time: '' });
  }

  setDateAndTime(date: string, time: string) {
    this.updateState({ date, time, step: 4 });
  }

  setCustomer(customer: Customer) {
    this.updateState({ customer, step: 5 }); // Step 5 is Review
  }

  goToStep(step: number) {
    this.updateState({ step });
  }

  reset() {
    this.state.next(initialState);
  }
}