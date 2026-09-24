import { Injectable } from '@angular/core';
import { Booking, BusinessHours } from '../models/booking.models';

@Injectable({
  providedIn: 'root'
})
export class BookingAvailability {

  calculateAvailableSlots(
    dateStr: string, // YYYY-MM-DD
    serviceDurationMinutes: number,
    hours: BusinessHours,
    existingBookings: Booking[]
  ): string[] {
    // Parse locally to avoid UTC timezone offset shifting the day
    const [year, month, day] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    const dayOfWeek = date.getDay();
    const dayHours = hours[dayOfWeek];

    if (!dayHours || !dayHours.isOpen) {
      return [];
    }

    const openMinutes = this.timeToMinutes(dayHours.openTime);
    const closeMinutes = this.timeToMinutes(dayHours.closeTime);
    const availableSlots: string[] = [];

    // Generate slots in 30-minute intervals
    const intervalMinutes = 30;

    for (let current = openMinutes; current + serviceDurationMinutes <= closeMinutes; current += intervalMinutes) {
      const slotStart = current;
      const slotEnd = current + serviceDurationMinutes;

      // Check if this potential slot overlaps with any existing booking
      const hasConflict = existingBookings.some(booking => {
        const bStart = this.timeToMinutes(booking.startTime);
        const bEnd = this.timeToMinutes(booking.endTime);
        return slotStart < bEnd && slotEnd > bStart; // True if overlapping
      });

      if (!hasConflict) {
        availableSlots.push(this.minutesToTime(current));
      }
    }

    return availableSlots;
  }

  private timeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  private minutesToTime(minutes: number): string {
    const h = Math.floor(minutes / 60).toString().padStart(2, '0');
    const m = (minutes % 60).toString().padStart(2, '0');
    return `${h}:${m}`;
  }
}