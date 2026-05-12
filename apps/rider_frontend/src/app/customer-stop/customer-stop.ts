import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-stop',
  standalone: false,
  templateUrl: './customer-stop.html',
  styleUrl: './customer-stop.css',
})
export class CustomerStop {
  orderItems = [
    'Milk 1L ×2',
    'Bread ×1',
    'Eggs ×1 doz',
    'Cheese 500g ×1',
    'Juice ×3',
  ];
  orderTotal = 12450;
  paymentMethod = 'COD'; // or 'PREPAID'
  isWithin300m = true; // set by GPS; for demo true
  cashInHand = 2500;
  maxCashLimit = 10000;

  showMismatchModal = false;
  collectedAmount: number | null = null;
  showPaymentConfirmation = false;

  constructor(private router: Router) {}

  goBack(): void {
    // Only navigate back if the order hasn't been processed yet
    this.router.navigate(['/active-trip-map']);
  }

  closeMismatchModal(): void {
    this.showMismatchModal = false;
  }

  private markAsProcessed(): void {
    // POST /trip/{tripId}/order/{orderId}/processed { paymentReceived: true }
    this.router.navigate(['/active-trip-map']);
  }

  notReceived(): void {
    if (!this.isWithin300m) return;
    // POST /trip/{tripId}/order/{orderId}/not-received
    // Then navigate to return route.
    this.router.navigate(['/return-route']);
  }

  promptMarkAsProcessed(): void {
    if (this.paymentMethod === 'COD') {
      // Show confirmation dialog instead of amount input
      this.showPaymentConfirmation = true;
    } else {
      this.markAsProcessed();
    }
  }

  confirmPaymentReceived(): void {
    this.showPaymentConfirmation = false;
    this.markAsProcessed();
  }
}
