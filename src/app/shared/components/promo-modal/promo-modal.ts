import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-promo-modal',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './promo-modal.html',
  styleUrl: './promo-modal.scss'
})
export class PromoModalComponent implements OnInit {
  isVisible = false;
  private storageKey = 'obsidian_promo_dismissed';

  ngOnInit() {
    // Check if the user has already dismissed the modal
    const hasSeenPromo = localStorage.getItem(this.storageKey);
    
    if (!hasSeenPromo) {
      // Delay appearance slightly for better UX
      setTimeout(() => {
        this.isVisible = true;
      }, 3000);
    }
  }

  closeModal() {
    this.isVisible = false;
    localStorage.setItem(this.storageKey, 'true');
  }

  onBackdropClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop-custom')) {
      this.closeModal();
    }
  }
}