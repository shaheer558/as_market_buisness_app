import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CurrencyPipe, DatePipe, PercentPipe } from '@angular/common';

interface BaseWiseItem {
  name: string;
  deliveryFees: number;
  fuelCost: number;
  difference: number;
  margin: number;
}

interface TripDetail {
  tripId: string;
  rider: string;
  date: string;
  deliveryFees: number;
  fuelCost: number;
  profit: number;
}

@Component({
  selector: 'app-base-wise-stats',
  standalone: false,
  templateUrl: './base-wise-stats.html',
  styleUrls: ['./base-wise-stats.css', '../../output.scss'],
  providers: [CurrencyPipe, DatePipe, PercentPipe],
})
export class BaseWiseStats {
  dateFrom = '2026-04-01';
  dateTo = '2026-04-30';
  drillDownBase: BaseWiseItem | null = null;
  drillDownTrips: TripDetail[] = [];

  baseWiseData: BaseWiseItem[] = [
    {
      name: 'Gulberg',
      deliveryFees: 125000,
      fuelCost: 98000,
      difference: 27000,
      margin: 0.216,
    },
    {
      name: 'Model Town',
      deliveryFees: 87500,
      fuelCost: 76300,
      difference: 11200,
      margin: 0.128,
    },
    {
      name: 'Garden Town',
      deliveryFees: 62000,
      fuelCost: 70500,
      difference: -8500,
      margin: -0.137,
    },
    {
      name: 'Allama Iqbal',
      deliveryFees: 45000,
      fuelCost: 58200,
      difference: -13200,
      margin: -0.293,
    },
  ];

  constructor(private router: Router) {}

  get totalDeliveryFees(): number {
    return this.baseWiseData.reduce((sum, b) => sum + b.deliveryFees, 0);
  }
  get totalFuelCost(): number {
    return this.baseWiseData.reduce((sum, b) => sum + b.fuelCost, 0);
  }
  get totalDifference(): number {
    return this.totalDeliveryFees - this.totalFuelCost;
  }
  get totalMargin(): number {
    if (this.totalDeliveryFees === 0) return 0;
    return this.totalDifference / this.totalDeliveryFees;
  }

  toggleDrillDown(base: BaseWiseItem): void {
    if (this.drillDownBase?.name === base.name) {
      this.drillDownBase = null;
      this.drillDownTrips = [];
    } else {
      this.drillDownBase = base;
      // Mock trip data – replace with API call filtered by base
      this.drillDownTrips = [
        {
          tripId: '#4521',
          rider: 'Ahmed Khan',
          date: '05 Apr',
          deliveryFees: 1200,
          fuelCost: 380,
          profit: 820,
        },
        {
          tripId: '#4530',
          rider: 'Sana Malik',
          date: '07 Apr',
          deliveryFees: 950,
          fuelCost: 410,
          profit: 540,
        },
        {
          tripId: '#4542',
          rider: 'Ahmed Khan',
          date: '12 Apr',
          deliveryFees: 2100,
          fuelCost: 780,
          profit: 1320,
        },
      ];
    }
  }

  applyFilter(): void {
    // In real app, fetch data with dateFrom/dateTo
    console.log('Fetching data from', this.dateFrom, 'to', this.dateTo);
  }

  exportPDF(): void {
    console.log('Export PDF');
  }
  exportCSV(): void {
    console.log('Export CSV');
  }

  backToReports(): void {
    this.router.navigate(['/financial-reports']);
  }
}
