import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Service, Barber, BusinessHours, Booking } from '../models/booking.models';

@Injectable({
  providedIn: 'root'
})
export class BusinessDataService {
  
  private readonly services: Service[] = [
    { id: 's1', name: 'Signature Skin Fade', description: 'Precision fade with hot towel finish and styling.', price: 280, durationMinutes: 45 },
    { id: 's2', name: 'Executive Cut & Beard', description: 'Complete haircut and beard sculpt with straight razor.', price: 450, durationMinutes: 60 },
    { id: 's3', name: 'Classic Taper', description: 'Traditional scissor cut and taper.', price: 220, durationMinutes: 30 },
    { id: 's4', name: 'Hot Towel Shave', description: 'Traditional wet shave with essential oils.', price: 180, durationMinutes: 30 }
  ];

  private readonly barbers: Barber[] = [
    { id: 'b1', name: 'Modise', role: 'Master Barber', specialties: ['Skin Fades', 'Hot Towel Shave'], imageUrl: '/images/modise.jpg' },
    { id: 'b2', name: 'Thato', role: 'Senior Barber', specialties: ['Classic Cuts', 'Beard Sculpting'], imageUrl: '/images/thato.jpg' },
    { id: 'b3', name: 'Elias', role: 'Barber', specialties: ['Tapers', 'Modern Styles'], imageUrl: '/images/elias.jpg' }
  ];

  private readonly businessHours: BusinessHours = {
    0: { isOpen: false, openTime: '', closeTime: '' }, // Sunday
    1: { isOpen: true, openTime: '09:00', closeTime: '18:00' }, // Monday
    2: { isOpen: true, openTime: '09:00', closeTime: '18:00' },
    3: { isOpen: true, openTime: '09:00', closeTime: '18:00' },
    4: { isOpen: true, openTime: '09:00', closeTime: '18:00' },
    5: { isOpen: true, openTime: '09:00', closeTime: '19:00' }, // Friday (Extended)
    6: { isOpen: true, openTime: '08:00', closeTime: '15:00' }  // Saturday
  };

  // Mock database of existing appointments to test calendar block-outs
  private mockBookings: Booking[] = [
    {
      id: 'mock1',
      service: this.services[0],
      barber: this.barbers[0],
      date: '2026-09-25',
      startTime: '10:00',
      endTime: '10:45',
      customer: { firstName: 'John', lastName: 'Doe', email: 'john@example.com', phone: '0821234567' }
    }
  ];

  getServices(): Observable<Service[]> {
    return of([...this.services]);
  }

  getBarbers(): Observable<Barber[]> {
    return of([...this.barbers]);
  }

  getBusinessHours(): Observable<BusinessHours> {
    return of({ ...this.businessHours });
  }

  getBookingsByDateAndBarber(date: string, barberId: string): Observable<Booking[]> {
    const bookings = this.mockBookings.filter(b => b.date === date && b.barber.id === barberId);
    return of(bookings);
  }

  addBooking(booking: Booking): Observable<boolean> {
    this.mockBookings.push({ ...booking, id: Math.random().toString(36).substr(2, 9) });
    return of(true);
  }
}