import { Component, Input, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Customer } from '../../../../core/models/booking.models';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './customer-form.html',
  styleUrl: './customer-form.scss'
})
export class CustomerFormComponent implements OnInit {
  private fb = inject(FormBuilder);

  @Input() initialData: Customer | null = null;
  @Output() formSubmitted = new EventEmitter<Customer>();

  customerForm!: FormGroup;

  ngOnInit() {
    this.customerForm = this.fb.group({
      firstName: [this.initialData?.firstName || '', [Validators.required, Validators.pattern(/^[a-zA-Z\s\-']+$/), Validators.maxLength(50)]],
      lastName: [this.initialData?.lastName || '', [Validators.required, Validators.pattern(/^[a-zA-Z\s\-']+$/), Validators.maxLength(50)]],
      email: [this.initialData?.email || '', [Validators.required, Validators.email]],
      phone: [this.initialData?.phone || '', [Validators.required, Validators.pattern(/^(\+27|0)[6-8][0-9]{8}$/)]]
    });
  }

  onSubmit() {
    if (this.customerForm.valid) {
      this.formSubmitted.emit(this.customerForm.value as Customer);
    } else {
      this.customerForm.markAllAsTouched();
    }
  }

  // Helpers for cleaner template
  get f() { return this.customerForm.controls; }
}