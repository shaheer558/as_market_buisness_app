import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

enum OrderStatus {
  DELIVERED = 'delivered',
  PICKING = 'picking',
  PENDING = 'pending',
}

interface OrderSequenceItem {
  id: number;
  customerName: string;
  address: string;
  itemCount: number;
  size: string;
  status: OrderStatus;
  statusLabel: string; // 'DELIVERED', 'PICKING', 'PENDING'
}

@Component({
  selector: 'app-order-sequence',
  standalone: false,
  templateUrl: './order-sequence.html',
  styleUrls: ['./order-sequence.css', '../../output.scss'],
})
export class OrderSequence {
  orders: OrderSequenceItem[] = [];
  OrderStatus = OrderStatus; // Expose enum to template

  constructor(private router: Router) {}

  ngOnInit(): void {
    // In production: fetch from TripService via GET /trip/{tripId}/order-sequence
    this.orders = this.getMockOrders();
  }

  private getMockOrders(): OrderSequenceItem[] {
    return [
      {
        id: 1,
        customerName: 'Ayesha Iqbal',
        address: 'Garden Town',
        itemCount: 5,
        size: 'small',
        status: OrderStatus.DELIVERED,
        statusLabel: 'DELIVERED',
      },
      {
        id: 2,
        customerName: 'Bilal Ahmed',
        address: 'Gulberg',
        itemCount: 3,
        size: 'small',
        status: OrderStatus.PICKING,
        statusLabel: 'PICKING',
      },
      {
        id: 3,
        customerName: 'Fatima Noor',
        address: 'Model Town',
        itemCount: 2,
        size: 'medium',
        status: OrderStatus.PENDING,
        statusLabel: 'PENDING',
      },
    ];
  }

  goBack(): void {
    this.router.navigate(['/active-trip-map']);
  }
}
