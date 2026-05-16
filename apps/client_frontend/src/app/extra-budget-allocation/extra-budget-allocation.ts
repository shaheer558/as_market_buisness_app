import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-extra-budget-allocation',
  standalone: false,
  templateUrl: './extra-budget-allocation.html',
  styleUrls: ['./extra-budget-allocation.css', '../../output.scss'],
})
export class ExtraBudgetAllocation {
  budgetAmount: number | null = null;
  errorMessage: string | null = null;
  pendingApproval = false;

  constructor(private router: Router) {}

  /**
   * Proposes a budget allocation for unanimous approval.
   * Does NOT directly allocate funds.
   */
  proposeBudget(): void {
    if (!this.budgetAmount || this.budgetAmount <= 0) {
      this.errorMessage =
        'Enter a valid positive amount (must not exceed plan limits).';
      return;
    }
    this.errorMessage = null;

    // In production: POST /budget/propose (or similar) with orderId, amount
    console.log('Budget proposal submitted for approval:', this.budgetAmount);
    this.pendingApproval = true;
    // The actual allocation will happen only after all clients approve
    // (typically via WebSocket or polling notification)
  }

  cancel(): void {
    this.router.navigate(['/live-map']);
  }
}
