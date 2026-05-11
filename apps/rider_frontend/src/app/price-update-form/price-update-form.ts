import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

interface ProductWithPrice {
  name: string;
  quantity: number;
  originalPrice: number;
  newPrice: number | null;
}

type FormStatus = 'initial' | 'pending' | 'approved';

@Component({
  selector: 'app-price-update-form',
  standalone: false,
  templateUrl: './price-update-form.html',
  styleUrls: ['./price-update-form.css', '../../output.scss'],
})
export class PriceUpdateForm implements OnInit {
  products: ProductWithPrice[] = [];
  status: FormStatus = 'initial';
  billFile: File | null = null;
  billFileName = '';
  shopkeeperAccount = '';
  errors: string[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    // Retrieve passed items from ShopStop (if any)
    const state = history.state;
    if (state && state.items) {
      this.products = state.items.map((item: any) => ({
        name: item.name,
        quantity: item.quantity,
        originalPrice: item.originalPrice || 100, // fallback
        newPrice: null,
      }));
    } else {
      // mock data for standalone testing
      this.products = [
        { name: 'Milk 1L', quantity: 2, originalPrice: 225, newPrice: null },
        { name: 'Bread', quantity: 1, originalPrice: 80, newPrice: null },
        {
          name: 'Cheese 500g',
          quantity: 1,
          originalPrice: 700,
          newPrice: null,
        },
      ];
    }

    // Check for existing request status from service (could be from WebSocket)
    // For now, leave initial; will be updated by external events.
  }

  onBillImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.billFile = input.files[0];
      this.billFileName = this.billFile.name;
    }
  }

  submit(): void {
    this.errors = [];
    // Validate at least one product has new price, bill uploaded, etc.
    if (!this.billFile) {
      this.errors.push('Bill image is required.');
    }
    const anyPriceChanged = this.products.some(
      (p) => p.newPrice !== null && p.newPrice > 0,
    );
    if (!anyPriceChanged) {
      this.errors.push('At least one product price must be changed.');
    }
    if (this.errors.length) return;

    // POST /price-update-request
    // On success, set status to pending
    this.status = 'pending';
  }

  payShopOwner(): void {
    // POST /trip/{tid}/shop/{sid}/pay (or specific endpoint)
    // After payment, navigate back to ShopStop
    this.router.navigate(['/shop-stop']);
  }

  goBack(): void {
    this.router.navigate(['/shop-stop']);
  }

  // Call this from WebSocket handler when client approves
  onRequestApproved(): void {
    this.status = 'approved';
  }
}
