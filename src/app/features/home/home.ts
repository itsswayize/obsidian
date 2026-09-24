import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { BusinessDataService } from '../../core/services/business-data';
import { Barber, Service } from '../../core/models/booking.models';
import { PromoModalComponent } from '../../shared/components/promo-modal/promo-modal';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, PromoModalComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent {
  services$: Observable<Service[]>;
  barbers$: Observable<Barber[]>;

  constructor(private readonly businessData: BusinessDataService) {
    this.services$ = this.businessData.getServices();
    this.barbers$ = this.businessData.getBarbers();
  }
}