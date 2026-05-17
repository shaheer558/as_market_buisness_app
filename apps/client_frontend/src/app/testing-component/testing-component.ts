import { Component } from '@angular/core';

interface RouteLinkItem {
  path: string;
  label: string;
  description: string;
  category: string;
  queryParams?: Record<string, string | number>;
}

@Component({
  selector: 'app-testing-component',
  standalone: false,
  templateUrl: './testing-component.html',
  styleUrls: ['./testing-component.css', '../../output.scss'],
})
export class TestingComponent {
  readonly routeGroups: { title: string; items: RouteLinkItem[] }[] = [
    {
      title: 'Operations',
      items: [
        {
          path: '/system-config',
          label: 'System Config',
          description: 'Test application-wide configuration controls.',
          category: 'Settings',
        },
        {
          path: '/live-map',
          label: 'Live Map',
          description: 'Open the rider live tracking and intervention view.',
          category: 'Monitoring',
        },
        // {
        //   path: '/ext-budg-allc',
        //   label: 'Extra Budget Allocation',
        //   description: 'Review the extra budget allocation workflow screen.',
        //   category: 'Intervention',
        // },
        {
          path: '/order-messages',
          label: 'Order Messages',
          description: 'Inspect communication and messaging related to orders.',
          category: 'Orders',
        },
        // {
        //   path: '/order-details',
        //   label: 'Order Details',
        //   description: 'Open the base order details component without parameters.',
        //   category: 'Orders',
        // },
        {
          path: '/order-details/4521',
          label: 'Order Details (Sample ID)',
          description: 'Test the parameterized order details route with sample order ID 4521.',
          category: 'Orders',
        },
        {
          path: '/complaints',
          label: 'Complaints',
          description: 'Review complaint handling and status management UI.',
          category: 'Support',
        },
      ],
    },
    {
      title: 'Approvals And Finance',
      items: [
        {
          path: '/price-update-approvals',
          label: 'Price Update Approvals',
          description: 'Check the approval queue for pricing changes.',
          category: 'Approvals',
        },
        {
          path: '/financial-reports',
          label: 'Financial Reports',
          description: 'Open the reporting dashboard for financial insights.',
          category: 'Finance',
        },
        // {
        //   path: '/base-wise-stats',
        //   label: 'Base Wise Stats',
        //   description: 'View base-by-base performance and operational metrics.',
        //   category: 'Analytics',
        // },
        {
          path: '/app-treasure',
          label: 'App Treasure',
          description: 'Inspect app treasury deposits, withdrawals, and history.',
          category: 'Finance',
        },
        {
          path: '/budget-plans',
          label: 'Budget Plans',
          description: 'Test budgets, plans, promotions, and approval sections.',
          category: 'Planning',
        },
      ],
    },
    {
      title: 'Campaigns And Legal',
      items: [
        {
          path: '/discount-events',
          label: 'Discount Events',
          description: 'Open discount event creation and approval flows.',
          category: 'Campaigns',
        },
        {
          path: '/legal-agreements',
          label: 'Legal Agreements',
          description: 'Test agreement versioning, retirement, and content views.',
          category: 'Legal',
        },
      ],
    },
  ];

  readonly totalRoutes = this.routeGroups.reduce(
    (count, group) => count + group.items.length,
    0,
  );
}
