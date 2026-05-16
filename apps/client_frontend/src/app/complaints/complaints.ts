import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Complaint {
  id: string;
  orderId: string;
  customer: string;
  product: string;
  productSize: string;
  filedDate: string;
  deadline: string;
  status: 'active' | 'expired' | 'resolved';
  isUrgent: boolean; // true if < 24h remaining
  isExpired: boolean;
}

@Component({
  selector: 'app-complaints',
  standalone: false,
  templateUrl: './complaints.html',
  styleUrls: ['./complaints.css', '../../output.scss'],
})
export class Complaints {
  searchQuery = '';
  statusFilter = '';
  dateFilter = '30';

  currentPage = 1;
  pageSize = 20;
  totalComplaints = 12;
  totalPages = Math.ceil(this.totalComplaints / this.pageSize);

  allComplaints: Complaint[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.allComplaints = this.getMockComplaints();
  }

  private getMockComplaints(): Complaint[] {
    return [
      {
        id: '#1',
        orderId: '#4521',
        customer: 'Ayesha Iqbal',
        product: 'Milk 1L',
        productSize: 'small',
        filedDate: '12 Apr',
        deadline: '13 Apr (1d)',
        status: 'active',
        isUrgent: true,
        isExpired: false,
      },
      {
        id: '#2',
        orderId: '#4517',
        customer: 'Fatima Noor',
        product: 'Cheese',
        productSize: 'medium',
        filedDate: '10 Apr',
        deadline: '17 Apr (7d)',
        status: 'active',
        isUrgent: false,
        isExpired: false,
      },
      {
        id: '#3',
        orderId: '#4510',
        customer: 'Omar Farooq',
        product: 'Juice',
        productSize: 'small',
        filedDate: '05 Apr',
        deadline: 'Expired',
        status: 'expired',
        isUrgent: false,
        isExpired: true,
      },
      {
        id: '#4',
        orderId: '#4505',
        customer: 'Bilal Ahmed',
        product: 'Eggs 1 doz',
        productSize: 'medium',
        filedDate: '01 Apr',
        deadline: '08 Apr (7d)',
        status: 'resolved',
        isUrgent: false,
        isExpired: false,
      },
    ];
  }

  get filteredComplaints(): Complaint[] {
    let result = this.allComplaints;

    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      result = result.filter(
        (c) =>
          c.id.toLowerCase().includes(q) ||
          c.customer.toLowerCase().includes(q) ||
          c.orderId.toLowerCase().includes(q),
      );
    }

    if (this.statusFilter === 'active') {
      result = result.filter((c) => c.status === 'active');
    } else if (this.statusFilter === 'processed') {
      result = result.filter(
        (c) => c.status === 'expired' || c.status === 'resolved',
      );
    }

    // Date filter logic (mock)
    return result.slice(
      (this.currentPage - 1) * this.pageSize,
      this.currentPage * this.pageSize,
    );
  }

  openComplaintDetail(complaint: Complaint): void {
    // Expired complaints are non-actionable per the prototype
    if (complaint.isExpired) return;

    // Navigate to complaint resolution screen
    this.router.navigate(['/complaint-detail', complaint.id]);
  }

  prevPage(): void {
    if (this.currentPage > 1) this.currentPage--;
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }
}
