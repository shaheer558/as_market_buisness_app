import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface PriceUpdateRequest {
  id: string;
  rider: string;
  shop: string;
  product: string;
  originalPrice: number;
  actualPrice: number;
  timeLeft: string;
  timeStatus: 'urgent' | 'normal' | 'expired' | 'none';
  status: 'pending' | 'approved' | 'rejected';
  fuelCost: number;
  profitImpact: number;
  shopkeeperDetails: string;
}

@Component({
  selector: 'app-price-update-approvals',
  standalone: false,
  templateUrl: './price-update-approvals.html',
  styleUrls: ['./price-update-approvals.css', '../../output.scss'],
})
export class PriceUpdateApprovals {
  statusFilter: string = 'pending';
  selectedRequest: PriceUpdateRequest | null = null;

  allRequests: PriceUpdateRequest[] = [
    {
      id: '#231',
      rider: 'Ahmed Khan',
      shop: 'Imtiaz St.',
      product: 'Milk 1L',
      originalPrice: 450,
      actualPrice: 520,
      timeLeft: '2m 34s',
      timeStatus: 'urgent',
      status: 'pending',
      fuelCost: 45,
      profitImpact: -70,
      shopkeeperDetails: 'Easypaisa – 0300****78',
    },
    {
      id: '#228',
      rider: 'Bilal A.',
      shop: 'HKB Groc.',
      product: 'Bread',
      originalPrice: 80,
      actualPrice: 95,
      timeLeft: '4m 12s',
      timeStatus: 'normal',
      status: 'pending',
      fuelCost: 30,
      profitImpact: -15,
      shopkeeperDetails: 'Jazzcash – 0321****45',
    },
    {
      id: '#225',
      rider: 'Sana Malik',
      shop: 'Daily Mart',
      product: 'Juice',
      originalPrice: 550,
      actualPrice: 600,
      timeLeft: '0m 00s',
      timeStatus: 'expired',
      status: 'pending',
      fuelCost: 50,
      profitImpact: -50,
      shopkeeperDetails: 'Bank – 123456789',
    },
  ];

  constructor(private router: Router) {}

  get filteredRequests(): PriceUpdateRequest[] {
    return this.allRequests.filter((r) => r.status === this.statusFilter);
  }

  toggleDetail(req: PriceUpdateRequest): void {
    if (this.selectedRequest?.id === req.id) {
      this.selectedRequest = null;
    } else {
      this.selectedRequest = req;
    }
  }

  approveRequest(req: PriceUpdateRequest): void {
    // POST /price-update-request/{id}/approve
    console.log('Approved:', req.id);
    req.status = 'approved';
    this.selectedRequest = null;
  }

  rejectRequest(req: PriceUpdateRequest): void {
    // POST /price-update-request/{id}/reject
    console.log('Rejected:', req.id);
    req.status = 'rejected';
    this.selectedRequest = null;
  }

  backToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
