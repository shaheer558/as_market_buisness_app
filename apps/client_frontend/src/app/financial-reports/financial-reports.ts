import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CurrencyPipe, DatePipe, PercentPipe } from '@angular/common';

interface ReportType {
  id: string;
  label: string;
}

interface IncomeStatement {
  revenue: number;
  productSales: number;
  deliveryFees: number;
  hiddenFees: number;
  otherIncome: number;
  costOfOperations: number;
  fuelCost: number;
  riderProfitShare: number;
  returnRefundCost: number;
  otherExpenses: number;
  grossProfit: number;
  clientDividends: number;
  netProfit: number;
}

interface BalanceSheet {
  cashBank: number;
  appTreasure: number;
  receivables: number;
  totalAssets: number;
  payables: number;
  unpaidProfitShares: number;
  totalLiabilities: number;
  totalEquity: number;
}

interface CashFlow {
  operating: number;
  investing: number;
  financing: number;
  netCashFlow: number;
}

interface AppTreasureTransaction {
  date: string;
  type: string;
  amount: number;
  reference: string;
}

interface AppTreasure {
  currentBalance: number;
  transactions: AppTreasureTransaction[];
}

interface BaseWiseItem {
  name: string;
  deliveryFees: number;
  fuelCost: number;
  difference: number;
  margin: number;
}

interface UnpaidShare {
  name: string;
  amount: number;
}

interface DepWithTransaction {
  date: string;
  type: string;
  amount: number;
  source: string;
}

@Component({
  selector: 'app-financial-reports',
  standalone: false,
  templateUrl: './financial-reports.html',
  styleUrls: ['./financial-reports.css', '../../output.scss'],
  providers: [CurrencyPipe, DatePipe, PercentPipe],
})
export class FinancialReports implements OnInit {
  dateFrom = '2026-04-01';
  dateTo = '2026-04-30';
  filterBase = '';
  filterRider = '';
  selectedReportId = 'income';
  isLoading = signal<boolean>(false);
  showAsyncMessage = false;

  reportTypes: ReportType[] = [
    { id: 'income', label: 'Income Statement' },
    { id: 'balance', label: 'Balance Sheet' },
    { id: 'cashflow', label: 'Cash Flow' },
    { id: 'apptreasure', label: 'App Treasure' },
    { id: 'basewise', label: 'Base‑wise' },
    { id: 'unpaid', label: 'Unpaid Profits' },
    { id: 'depwith', label: 'Deposit/withdraw' },
  ];

  // Data containers for each report
  incomeData?: IncomeStatement;
  balanceData?: BalanceSheet;
  cashFlowData?: CashFlow;
  appTreasureData?: AppTreasure;
  baseWiseData?: BaseWiseItem[];
  unpaidSharesData?: UnpaidShare[];
  depWithData?: DepWithTransaction[];

  constructor(private router: Router) {}

  ngOnInit(){
    this.selectReport(this.selectedReportId);
  }

  get selectedReport(): ReportType | undefined {
    return this.reportTypes.find((r) => r.id === this.selectedReportId);
  }

  selectReport(reportId: string): void {
    this.selectedReportId = reportId;
    this.isLoading.update(() => true);
    this.showAsyncMessage = false;

    // Load data first, then clear loading (smoother UI)
    this.loadMockData(reportId);
    setTimeout(() => {
      this.isLoading.update(() => false);
    }, 500); // small delay so spinner shows briefly, or set to 0
  }

  applyFilters(): void {
    this.selectReport(this.selectedReportId);
  }

  exportPDF(): void {
    console.log('Export PDF');
  }
  exportCSV(): void {
    console.log('Export CSV');
  }

  drillDown(): void {
    if (this.selectedReportId === 'basewise') {
      this.router.navigate(['/base-wise-stats']);
    } else if (this.selectedReportId === 'income') {
      this.router.navigate(['/income-drilldown']);
    } else {
      console.log('Drill-down for', this.selectedReportId);
    }
  }

  private loadMockData(reportId: string): void {
    switch (reportId) {
      case 'income':
        this.incomeData = {
          revenue: 1250000,
          productSales: 975000,
          deliveryFees: 225000,
          hiddenFees: 50000,
          otherIncome: 0,
          costOfOperations: 780000,
          fuelCost: 320000,
          riderProfitShare: 280000,
          returnRefundCost: 70000,
          otherExpenses: 110000,
          grossProfit: 470000,
          clientDividends: 320000,
          netProfit: 150000,
        };
        break;
      case 'balance':
        this.balanceData = {
          cashBank: 500000,
          appTreasure: 200000,
          receivables: 150000,
          totalAssets: 850000,
          payables: 120000,
          unpaidProfitShares: 80000,
          totalLiabilities: 200000,
          totalEquity: 650000,
        };
        break;
      case 'cashflow':
        this.cashFlowData = {
          operating: 320000,
          investing: -50000,
          financing: -100000,
          netCashFlow: 170000,
        };
        break;
      case 'apptreasure':
        this.appTreasureData = {
          currentBalance: 520000,
          transactions: [
            {
              date: '15-Apr',
              type: 'Deposit',
              amount: 50000,
              reference: 'TXN001',
            },
            {
              date: '12-Apr',
              type: 'Withdrawal',
              amount: -20000,
              reference: 'TXN002',
            },
            {
              date: '10-Apr',
              type: 'Withdrawal',
              amount: -15000,
              reference: 'TXN003',
            },
            {
              date: '05-Apr',
              type: 'Deposit',
              amount: 100000,
              reference: 'TXN004',
            },
          ],
        };
        break;
      case 'basewise':
        this.baseWiseData = [
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
        ];
        break;
      case 'unpaid':
        this.unpaidSharesData = [
          { name: 'Ahmed Khan', amount: 65000 },
          { name: 'Sana Malik', amount: 48000 },
          { name: 'Bilal Ahmed', amount: 42000 },
        ];
        break;
      case 'depwith':
        this.depWithData = [
          {
            date: '15-Apr',
            type: 'Deposit',
            amount: 50000,
            source: 'Bank Transfer',
          },
          {
            date: '12-Apr',
            type: 'Withdrawal',
            amount: -20000,
            source: 'Easypaisa',
          },
          {
            date: '10-Apr',
            type: 'Withdrawal',
            amount: -15000,
            source: 'Jazzcash',
          },
        ];
        break;
    }
  }
}
