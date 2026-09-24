import { Component, Input, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { BusinessDataService } from '../../../../core/services/business-data';
import { Barber } from '../../../../core/models/booking.models';

@Component({
  selector: 'app-barber-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './barber-selector.html',
  styleUrl: './barber-selector.scss'
})
export class BarberSelectorComponent implements OnInit {
  private businessData = inject(BusinessDataService);

  @Input() selectedBarberId?: string;
  @Output() barberSelected = new EventEmitter<Barber>();

  barbers$!: Observable<Barber[]>;

  ngOnInit() {
    this.barbers$ = this.businessData.getBarbers();
  }

  onSelect(barber: Barber) {
    this.barberSelected.emit(barber);
  }
}