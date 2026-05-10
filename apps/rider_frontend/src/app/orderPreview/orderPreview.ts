import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

type OrderPreviewState = 'normal' | 'cashLimitExceeded' | 'timeExceeded';

@Component({
  selector: 'app-order-preview',
  standalone: false,
  templateUrl: './orderPreview.html',
  styleUrls: ['./orderPreview.css', '../../output.scss'],
})
export class OrderPreview {
  @Input() state: OrderPreviewState = 'normal';
  @Input() showTightTimingWarning = false;

  constructor(private router: Router) {}

  /**
   * Called when the rider taps "Accept Trip".
   * In production, would call POST /dispatch/accept-trip and navigate to ActiveTripMap.
   */
  acceptTrip(): void {
    // POST /dispatch/accept-trip logic here
    // On success:
    this.router.navigate(['/active-trip-map']);
  }

  /**
   * Navigates back to the available orders list.
   */
  goBackToOrders(): void {
    this.router.navigate(['/available-orders']);
  }

  /**
   * Triggered from the Cash Limit Exceeded state.
   * Navigates to the map with base as destination.
   */
  navigateToBase(): void {
    // In real app, insert base stop into trip and navigate to ActiveTripMap
    this.router.navigate(['/active-trip-map'], {
      queryParams: { returnToBase: true },
    });
  }
}
