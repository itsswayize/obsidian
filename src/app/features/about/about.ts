import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { BusinessDataService } from '../../core/services/business-data';
import { Barber } from '../../core/models/booking.models';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class AboutComponent implements OnInit {
  private businessData = inject(BusinessDataService);
  barbers$!: Observable<Barber[]>;

  ngOnInit() {
    this.barbers$ = this.businessData.getBarbers();
  }
}