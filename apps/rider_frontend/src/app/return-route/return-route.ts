import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface ReturnItem {
  name: string;
  quantity: number;
  checked: boolean;
  note?: string;
}

@Component({
  selector: 'app-return-route',
  standalone: false,
  templateUrl: './return-route.html',
  styleUrls: ['./return-route.css', '../../output.scss'],
})
export class ReturnRoute {
  currentState: 'enroute' | 'atBase' = 'enroute';
  returnConfirmed = false;
  showChecklist = false;   // controls collapsible checklist in enroute state

  returnItems: ReturnItem[] = [
    { name: 'Milk 1L', quantity: 2, checked: false },
    { name: 'Bread', quantity: 1, checked: false },
    { name: 'Eggs 1 doz', quantity: 1, checked: false, note: 'due to shop closure' },
    { name: 'Cheese 500g', quantity: 1, checked: false },
    { name: 'Juice', quantity: 3, checked: false },
  ];

  constructor(private router: Router) {}

  arriveAtBase(): void {
    this.currentState = 'atBase';
  }

  confirmReturnDelivery(): void {
    // POST /return/final-delivered
    this.returnConfirmed = true;
  }

  goBack(): void {
    if (!this.returnConfirmed) {
      this.router.navigate(['/customer-stop']);
    }
  }
}
