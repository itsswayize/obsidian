export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  durationMinutes: number;
  imageUrl?: string;
}

export interface Barber {
  id: string;
  name: string;
  role: string;
  specialties: string[];
  imageUrl?: string;
}

export interface DayHours {
  isOpen: boolean;
  openTime: string; // "HH:mm" format (24h)
  closeTime: string; // "HH:mm" format (24h)
}

export interface BusinessHours {
  [dayOfWeek: number]: DayHours; // 0 = Sunday, 1 = Monday, etc.
}

export interface Customer {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface Booking {
  id?: string;
  service: Service;
  barber: Barber;
  date: string; // "YYYY-MM-DD"
  startTime: string; // "HH:mm"
  endTime: string; // "HH:mm"
  customer: Customer;
}