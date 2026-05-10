import { Component } from '@angular/core';
import { Router } from '@angular/router';

type ActiveTripState = 'enroute' | 'atshop';

interface ChecklistModel {
  milk: boolean;
  bread: boolean;
  eggs: boolean;
  cheese: boolean;
  juice: boolean;
}

type NextStopType = 'shop' | 'customer';

@Component({
  selector: 'app-active-trip-map',
  standalone: false,
  templateUrl: './activeTripMap.html',
  styleUrls: ['./activeTripMap.css', '../../output.scss'],
})
export class ActiveTripMap {
  currentState: ActiveTripState = 'enroute';
  showCashLimitWarning = false;

  // The type of the next stop – used to show/hide the “Arrive at Shop” button
  nextStopType: NextStopType = 'shop'; // can be updated dynamically

  checklist: ChecklistModel = {
    milk: true,
    bread: true,
    eggs: false,
    cheese: false,
    juice: true,
  };

  constructor(private router: Router) {}

  // ----- Navigation / State -----

  openMenu(): void {
    // Navigate to main menu (wallet, account settings)
    this.router.navigate(['/available-orders'], {
      queryParams: { openMenu: true },
    });
  }

  openOrderSequence(): void {
    this.router.navigate(['/order-sequence']);
  }

  returnToBase(): void {
    // POST /trip/{tripId}/insert-base-stop
    this.router.navigate(['/return-route']);
  }

  reportIncident(): void {
    this.router.navigate(['/incident-report']);
  }

  navigateToBase(): void {
    this.showCashLimitWarning = false;
    this.router.navigate(['/active-trip-map'], {
      queryParams: { returnToBase: true },
    });
  }

  // ----- Shop Actions -----

  updatePrice(): void {
    this.router.navigate(['/price-update-form']);
  }

  productNotAvailable(): void {
    // POST /trip/{tripId}/product-unavailable
    // Navigate back with route recalculation
  }

  confirmWishlistAvailability(): void {
    // POST /products/{productId}/confirm-availability
  }

  markShopDone(): void {
    // POST /trip/{tripId}/shop/{shopId}/complete
    // If more stops remain, continue; otherwise complete trip
    this.currentState = 'enroute';
  }

  // ----- Cash Limit Trigger (called when COD exceeds limit) -----

  triggerCashLimitWarning(): void {
    this.showCashLimitWarning = true;
  }

  /**
   * When the rider taps “Arrive at Shop”, the info panel
   * switches to the checklist (gcse proximity triggers this automatically).
   */
  arriveAtShop(): void {
    this.currentState = 'atshop';
  }
}
