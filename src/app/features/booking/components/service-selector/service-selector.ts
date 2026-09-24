import { Component, Input, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { BusinessDataService } from '../../../../core/services/business-data';
import { Service } from '../../../../core/models/booking.models';

@Component({
  selector: 'app-service-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service-selector.html',
  styleUrl: './service-selector.scss'
})
export class ServiceSelectorComponent implements OnInit {
  private businessData = inject(BusinessDataService);
  
  @Input() selectedServiceId?: string;
  @Output() serviceSelected = new EventEmitter<Service>();
  
  services$!: Observable<Service[]>;

  ngOnInit() {
    this.services$ = this.businessData.getServices();
  }

  onSelect(service: Service) {
    this.serviceSelected.emit(service);
  }
}