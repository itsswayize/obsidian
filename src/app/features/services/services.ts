import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { BusinessDataService } from '../../core/services/business-data';
import { Service } from '../../core/models/booking.models';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './services.html',
  styleUrl: './services.scss'
})
export class ServicesComponent implements OnInit {
  private businessData = inject(BusinessDataService);
  services$!: Observable<Service[]>;

  ngOnInit() {
    this.services$ = this.businessData.getServices();
  }
}