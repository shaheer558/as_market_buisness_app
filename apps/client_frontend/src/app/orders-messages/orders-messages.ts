import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

interface Order {
  id: string;
  customer: string;
  rider: string;
  status: string;
  total: number;
  unreadMessages: number;
  date: string;
}

@Component({
  selector: 'app-orders-messages',
  standalone: false,
  templateUrl: './orders-messages.html',
  styleUrls: ['./orders-messages.css', '../../output.scss'],
})
export class OrdersMessages implements OnInit {
  // Filters
  searchQuery = '';
  statusFilter = '';
  baseFilter = '';
  dateFrom = '';
  dateTo = '';
  showMobileFilters = false;
  filterAmountMin: number | null = null;
  filterAmountMax: number | null = null;

  // Pagination
  currentPage = 1;
  pageSize = 20;
  totalOrders = 240; // mock total
  totalPages = Math.ceil(this.totalOrders / this.pageSize);

  allOrders: Order[] = [];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // In production: fetch from API with filters & pagination
    this.allOrders = this.getMockOrders();

    //get parent order parameter if return back from order-detail page with split order
    this.route.queryParams.subscribe((params) => {
      console.log(params['parentOrder']);
    });
  }

  private getMockOrders(): Order[] {
    return [
      {
        id: '#4521',
        customer: 'Ayesha Iqbal',
        rider: 'Ahmed Khan',
        status: 'In Transit',
        total: 12450,
        unreadMessages: 2,
        date: '2026-04-15',
      },
      {
        id: '#4519',
        customer: 'Bilal Ahmed',
        rider: 'Sana Malik',
        status: 'Delivered',
        total: 8200,
        unreadMessages: 0,
        date: '2026-04-14',
      },
      {
        id: '#4517',
        customer: 'Fatima Noor',
        rider: 'Bilal A.',
        status: 'Returned',
        total: 5600,
        unreadMessages: 1,
        date: '2026-04-13',
      },
      {
        id: '#4515',
        customer: 'Omar Farooq',
        rider: 'Ahmed Khan',
        status: 'Cancelled',
        total: 3450,
        unreadMessages: 0,
        date: '2026-04-12',
      },
      {
        id: '#4514',
        customer: 'Ayesha Iqbal',
        rider: 'Ahmed Khan',
        status: 'In Transit',
        total: 12450,
        unreadMessages: 0,
        date: '2026-04-15',
      },
      {
        id: '#4513',
        customer: 'Bilal Ahmed',
        rider: 'Sana Malik',
        status: 'Delivered',
        total: 8200,
        unreadMessages: 0,
        date: '2026-04-14',
      },
    ];
  }

  // Client‑side filtering (in production, server‑side)
  get filteredOrders(): Order[] {
    let result = this.allOrders;

    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      result = result.filter(
        (o) =>
          o.id.toLowerCase().includes(q) ||
          o.customer.toLowerCase().includes(q),
      );
    }

    if (this.statusFilter) {
      result = result.filter((o) => o.status === this.statusFilter);
    }

    // base filter (example, not fully implemented in mock)
    if (this.baseFilter) {
      // In real app, filter by base; for mock we ignore.
    }

    // Date range filtering (mock implementation)
    if (this.dateFrom) {
      result = result.filter(
        (o) => new Date(o.date) >= new Date(this.dateFrom),
      );
    }
    if (this.dateTo) {
      result = result.filter((o) => new Date(o.date) <= new Date(this.dateTo));
    }

    // Amount range filtering
    if (this.filterAmountMin !== null) {
      result = result.filter((o) => o.total >= this.filterAmountMin!);
    }
    if (this.filterAmountMax !== null) {
      result = result.filter((o) => o.total <= this.filterAmountMax!);
    }

    return result.slice(
      (this.currentPage - 1) * this.pageSize,
      this.currentPage * this.pageSize,
    );
  }

  openOrderDetail(orderId: string, focusMessages = false): void {
    this.router.navigate(['/order-details', orderId], {
      queryParams: { focusMessages: focusMessages ? 'true' : undefined },
    });
  }

  prevPage(): void {
    if (this.currentPage > 1) this.currentPage--;
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }
}
