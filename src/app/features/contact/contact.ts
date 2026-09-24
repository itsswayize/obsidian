import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable, map } from 'rxjs';
import { BusinessDataService } from '../../core/services/business-data';

interface DayDisplay { name: string; hours: string; }

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class ContactComponent implements OnInit {
  private businessData = inject(BusinessDataService);
  hoursDisplay$!: Observable<DayDisplay[]>;

  private dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  ngOnInit() {
    this.hoursDisplay$ = this.businessData.getBusinessHours().pipe(
      map(hours => {
        // Reorder display to start from Monday (1) to Sunday (0)
        const orderedDays = [1, 2, 3, 4, 5, 6, 0];
        return orderedDays.map(day => ({
          name: this.dayNames[day],
          hours: hours[day].isOpen ? `${hours[day].openTime} - ${hours[day].closeTime}` : 'Closed'
        }));
      })
    );
  }
}