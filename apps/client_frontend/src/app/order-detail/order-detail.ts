import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-detail',
  standalone: false,
  templateUrl: './order-detail.html',
  styleUrls: ['./order-detail.css', '../../output.scss'],
})
export class OrderDetail {
  isSplitOrder = false; // set true for split orders (FR-C-08)

  // Track which sections are expanded on mobile/tablet
  expandedSections: Record<string, boolean> = {
    products: true,
    timeline: true,
    financial: true,
    messages: true,
  };
  orderId: string | null=null;

  products = [
    {
      name: 'Milk 1L',
      size: 'Small',
      quantity: 2,
      originalPrice: 200,
      actualPrice: 220,
      shop: 'Imtiaz',
    },
    {
      name: 'Bread',
      size: 'Small',
      quantity: 1,
      originalPrice: 80,
      actualPrice: 80,
      shop: 'Imtiaz',
    },
    {
      name: 'Eggs 1 doz',
      size: 'Small',
      quantity: 1,
      originalPrice: 300,
      actualPrice: 300,
      shop: 'Imtiaz',
    },
    {
      name: 'Cheese 500g',
      size: 'Small',
      quantity: 1,
      originalPrice: 700,
      actualPrice: 700,
      shop: 'Imtiaz',
    },
    {
      name: 'Juice',
      size: 'Small',
      quantity: 3,
      originalPrice: 150,
      actualPrice: 150,
      shop: 'Imtiaz',
    },
  ];

  timeline = [
    {
      label: 'Order Placed',
      timestamp: '10:15 AM',
      status: 'completed',
      isLast: false,
    },
    {
      label: 'Rider Assigned – Ahmed Khan',
      timestamp: '10:22 AM',
      status: 'completed',
      isLast: false,
    },
    {
      label: 'Picking at Imtiaz Store',
      timestamp: '10:45 AM',
      status: 'completed',
      isLast: false,
    },
    {
      label: 'Rider Departed (En Route)',
      timestamp: '11:10 AM',
      status: 'completed',
      isLast: false,
    },
    {
      label: 'Rider Reached / Delivered',
      timestamp: 'Pending',
      status: 'pending',
      isLast: true,
    },
  ];

  customerMessages = [
    {
      product: 'Milk 1L',
      preview: 'Is this full cream?',
      fullText: 'Is this full cream? I want to make sure before delivery.',
      sent: '09:30 AM',
      context: 'before purchase',
      attachment: null,
      expanded: false,
    },
    {
      product: 'Juice',
      preview: 'Please check expiry date',
      fullText: 'Please check the expiry date before buying.',
      sent: '09:32 AM',
      context: 'before purchase',
      attachment: 'expiry_check.jpg',
      expanded: false,
    },
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    // In production: fetch order details via GET /orders/{orderId}/details
    // Read the route param (orderId)
    this.route.paramMap.subscribe(params => {
      this.orderId = params.get('orderId')!;
      console.log('Order ID:', this.orderId);

      // In production: fetch order details via GET /orders/{orderId}/details
    });
    // Also check for focusMessages query param
    this.route.queryParams.subscribe((params) => {
      if (params['focusMessages'] === 'true') {
        // Ensure messages section is expanded
        this.expandedSections['messages'] = true;
        // Could also scroll to the messages section
      }
    });
  }

  exportPDF(): void {
    // POST /orders/{orderId}/export
    console.log('Exporting order as PDF...');
  }

  viewRelatedOrders(): void {
    // Navigate to orders list filtered by parent order ID
    this.router.navigate(['/orders-messages'], {
      queryParams: { parentOrder: '4520' },
    });
  }

  toggleSection(section: string): void {
    if (window.innerWidth < 768) {
      // Only toggle on mobile/tablet
      this.expandedSections[section] = !this.expandedSections[section];
    }
  }

  toggleMessage(message: any): void {
    message.expanded = !message.expanded;
  }
}
