import { Component } from '@angular/core';

interface Section {
  id: string;
  label: string;
}

interface UnpaidShare {
  name: string;
  amount: number;
  selected: boolean;
}

interface Budget {
  name: string;
  amount: number;
  targetRider?: string;
  status: 'Approved' | 'Pending' | 'Rejected';
}

interface Plan {
  name: string;
  budget: number;
  timeline: string;
  status: 'Active' | 'Pending' | 'Rejected';
}

interface ProductPromo {
  product: string;
  base: string;
  budget: number | null;
}

interface PendingApproval {
  name: string;
  type: string;
  proposer: string;
  date: string;
}

@Component({
  selector: 'app-budgets-plans',
  standalone: false,
  templateUrl: './budgets-plans.html',
  styleUrls: ['./budgets-plans.css', '../../output.scss'],
})
export class BudgetsPlans {
  // Navigation
  sections: Section[] = [
    { id: 'profit-sharing', label: 'Profit Sharing' },
    { id: 'budgets', label: 'Budgets' },
    { id: 'plans', label: 'Plans' },
    { id: 'promos', label: 'Product Promos' },
    { id: 'approvals', label: 'Pending Approvals' },
  ];
  activeSection = 'profit-sharing';

  // Constants
  chunkSize = 50000;

  // Profit Sharing data
  unpaidShares: UnpaidShare[] = [
    { name: 'Ahmed Khan', amount: 65000, selected: true },
    { name: 'Sana Malik', amount: 48000, selected: true },
    { name: 'Bilal Ahmed', amount: 42000, selected: false },
    { name: 'Fatima Noor', amount: 30000, selected: true },
  ];

  // Budgets data
  budgets: Budget[] = [
    {
      name: 'New Bikes Fund',
      amount: 200000,
      targetRider: '—',
      status: 'Pending',
    },
    {
      name: 'Ramzan Bonus',
      amount: 50000,
      targetRider: 'Ahmed Khan',
      status: 'Approved',
    },
  ];

  // Plans data
  plans: Plan[] = [
    {
      name: 'Fleet Expansion',
      budget: 500000,
      timeline: 'Jun – Dec 2026',
      status: 'Pending',
    },
    {
      name: 'Marketing Campaign',
      budget: 150000,
      timeline: 'May – Aug 2026',
      status: 'Active',
    },
  ];

  // Product Promos data
  promos: ProductPromo[] = [
    { product: 'Organic Milk 1L', base: 'Gulberg', budget: null },
    { product: 'Gluten‑Free Bread', base: 'Model Town', budget: null },
  ];

  // Pending Approvals data
  pendingApprovals: PendingApproval[] = [
    {
      name: 'Ramzan Discount Event',
      type: 'Discount Event',
      proposer: 'Client B',
      date: '12 Apr',
    },
    {
      name: 'Budget – New Bikes',
      type: 'Budget',
      proposer: 'Client A',
      date: '10 Apr',
    },
    {
      name: 'Config Change: Commission',
      type: 'Configuration',
      proposer: 'Client C',
      date: '08 Apr',
    },
  ];

  // --- Modal visibility ---
  showCreateBudgetModal = false;
  showCreatePlanModal = false;
  showRiderDetailsModal = false;

  // --- New item models ---
  newBudget = { name: '', amount: 0, reason: '', targetRider: '' };
  newPlan = { name: '', budget: 0, timeline: '', description: '', reason: '' };

  // --- Selected rider for details ---
  selectedRider: UnpaidShare | null = null;

  // --- Rider details mock data ---
  riderDetailsOrders: { orderId: string; date: string; amount: number }[] = [];

  // --- Computed properties ---
  get selectedCount(): number {
    return this.unpaidShares.filter((r) => r.selected).length;
  }

  get releaseTotal(): number {
    return this.unpaidShares
      .filter((r) => r.selected)
      .reduce((sum, r) => sum + r.amount, 0);
  }

  get totalUnpaid(): number {
    return this.unpaidShares.reduce((sum, r) => sum + r.amount, 0);
  }

  // --- Navigation ---
  selectSection(id: string): void {
    this.activeSection = id;
  }

  // --- Profit Sharing actions ---
  viewRiderDetails(rider: UnpaidShare): void {
    this.selectedRider = rider;
    // Mock data – replace with API call for that rider
    this.riderDetailsOrders = [
      { orderId: '#4521', date: '05 Apr', amount: 20000 },
      { orderId: '#4530', date: '07 Apr', amount: 15000 },
      { orderId: '#4542', date: '12 Apr', amount: 30000 },
    ];
    this.showRiderDetailsModal = true;
  }

  releaseSelected(): void {
    const selected = this.unpaidShares.filter((r) => r.selected);
    const total = selected.reduce((s, r) => s + r.amount, 0);
    // In production, POST /profit-sharing/release with selected ids
    alert(
      `Releasing Rs. ${total.toLocaleString()} for ${selected.length} riders.`,
    );
  }

  // --- Budgets / Plans actions ---
  openCreateBudget(): void {
    this.showCreateBudgetModal = true;
    this.newBudget = { name: '', amount: 0, reason: '', targetRider: '' };
  }

  openCreatePlan(): void {
    this.showCreatePlanModal = true;
    this.newPlan = {
      name: '',
      budget: 0,
      timeline: '',
      description: '',
      reason: '',
    };
  }

  submitBudget(): void {
    // Validate and POST /budget/propose
    console.log('Submitting budget:', this.newBudget);
    this.showCreateBudgetModal = false;
  }

  submitPlan(): void {
    // POST /plans
    console.log('Submitting plan:', this.newPlan);
    this.showCreatePlanModal = false;
  }

  // --- Product Promos ---
  submitPromotion(promo: ProductPromo): void {
    if (!promo.budget || promo.budget <= 0) {
      alert('Please enter a valid budget amount.');
      return;
    }
    // POST /product-promotion-budgets
    console.log('Submit promotion for', promo.product, 'amount', promo.budget);
  }

  // --- Pending Approvals ---
  vote(approval: PendingApproval, approve: boolean): void {
    // POST /approvals/{id}/vote
    console.log(approve ? 'Approved' : 'Rejected', approval.name);
  }
}
