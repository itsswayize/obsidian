import { Injectable } from '@angular/core';
import { Booking } from '../models/booking.models';

@Injectable({ providedIn: 'root' })
export class CalendarService {

  private formatIcsDate(dateStr: string, timeStr: string): string {
    // SAST is UTC+2. We enforce local time creation to prevent day-shifting.
    const localDate = new Date(`${dateStr}T${timeStr}:00+02:00`);
    return localDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  }

  generateGoogleCalendarUrl(booking: Booking): string {
    const start = this.formatIcsDate(booking.date, booking.startTime);
    const end = this.formatIcsDate(booking.date, booking.endTime);
    
    const text = encodeURIComponent(`Appointment: ${booking.service.name} with ${booking.barber.name}`);
    const details = encodeURIComponent(`Obsidian Grooming Co.\nService: ${booking.service.name}\nBarber: ${booking.barber.name}`);
    const location = encodeURIComponent('Obsidian Grooming Co, South Africa');

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${start}/${end}&details=${details}&location=${location}`;
  }

  generateAppleCalendarIcs(booking: Booking): void {
    const start = this.formatIcsDate(booking.date, booking.startTime);
    const end = this.formatIcsDate(booking.date, booking.endTime);

    // .ics files strictly require \r\n line breaks
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Obsidian Grooming Co//EN',
      'BEGIN:VEVENT',
      `DTSTART:${start}`,
      `DTEND:${end}`,
      `SUMMARY:Obsidian Grooming - ${booking.service.name}`,
      `DESCRIPTION:Appointment with ${booking.barber.name} for ${booking.service.name}.`,
      'LOCATION:Obsidian Grooming Co.',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `obsidian-appointment-${booking.date}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}