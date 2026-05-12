import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface ShopItem {
  name: string;
  quantity: number;
  picked: boolean;
}

type PriceUpdateStatus = 'none' | 'pending' | 'approved';

@Component({
  selector: 'app-shop-stop',
  standalone: false,
  templateUrl: './shop-stop.html',
  styleUrls: ['./shop-stop.css', '../../output.scss'],
})
export class ShopStop implements OnInit {
  items: ShopItem[] = [];
  shopkeeperAccount = '';
  priceUpdateStatus: PriceUpdateStatus = 'none'; // start with none, could be set dynamically

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.items = this.getMockItems();
    // In real app, fetch price update status from service (could be pending/approved)
  }

  private getMockItems(): ShopItem[] {
    return [
      { name: 'Milk 1L', quantity: 2, picked: true },
      { name: 'Bread', quantity: 1, picked: false },
      { name: 'Eggs 1 doz', quantity: 1, picked: false },
      { name: 'Cheese 500g', quantity: 1, picked: true },
      { name: 'Juice', quantity: 3, picked: false },
    ];
  }

  goBack(): void {
    this.router.navigate(['/active-trip-map']);
  }

  openUpdatePrice(): void {
    // Pass shop info and items to PriceUpdateForm (via state or route params)
    this.router.navigate(['/price-update-form'], {
      state: { items: this.items },
    });
  }

  productNotAvailable(): void {
    // open dialog, then POST /trip/{tid}/product-unavailable
  }

  confirmWishlistAvail(): void {
    // POST /products/{pid}/confirm-availability
  }

  payShopOwnerDirect(): void {
    // POST /trip/{tid}/shop/{sid}/pay-direct with shopkeeper account
    // If successful, disable button or show toast
  }

  payShopOwnerAfterApproval(): void {
    // POST /trip/{tid}/shop/{sid}/pay-approved with shopkeeper account
    // After payment, reset status to none
  }

  shopDone(): void {
    // POST /trip/{tid}/shop/{sid}/complete
    this.router.navigate(['/customer-stop']);
  }

  // This method would be called when a WebSocket message arrives
  updatePriceUpdateStatus(status: PriceUpdateStatus): void {
    this.priceUpdateStatus = status;
  }
}
