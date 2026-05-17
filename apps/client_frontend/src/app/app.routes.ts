import { Route } from '@angular/router';
import { SystemConfig } from './system-config/system-config';
import {LiveMap} from './live-map/live-map';
import {ExtraBudgetAllocation} from './extra-budget-allocation/extra-budget-allocation';
import {OrdersMessages} from './orders-messages/orders-messages';
import { OrderDetail } from './order-detail/order-detail';
import {Complaints} from './complaints/complaints';
import {PriceUpdateApprovals} from './price-update-approvals/price-update-approvals';
import {FinancialReports} from './financial-reports/financial-reports';
import {BaseWiseStats} from './base-wise-stats/base-wise-stats';
import {AppTreasure} from './app-treasure/app-treasure';
import {BudgetsPlans} from './budgets-plans/budgets-plans';
import {DiscountEvents} from './discount-events/discount-events';
import {LegalAgreements} from './legal-agreements/legal-agreements';
import {TestingComponent} from './testing-component/testing-component';

export const appRoutes: Route[] = [
  {
    path: 'home',
    component: TestingComponent
  },
  {
    path: 'system-config',
    component: SystemConfig,
  },
  {
    path: 'live-map',
    component: LiveMap,
  },
  {
    path: 'ext-budg-allc',
    component: ExtraBudgetAllocation,
  },
  {
    path: 'order-messages',
    component: OrdersMessages,
  },
  {
    path: 'order-details',
    component: OrderDetail,
  },
  {
    path: 'order-details/:orderId',
    component: OrderDetail,
  },
  {
    path: 'complaints',
    component: Complaints,
  },
  {
    path: 'price-update-approvals',
    component: PriceUpdateApprovals,
  },
  {
    path: 'financial-reports',
    component: FinancialReports,
  },
  {
    path: 'base-wise-stats',
    component: BaseWiseStats,
  },
  {
    path: 'app-treasure',
    component: AppTreasure,
  },
  {
    path: 'budget-plans',
    component: BudgetsPlans
  },
  {
    path: 'discount-events',
    component: DiscountEvents
  },
  {
    path: 'legal-agreements',
    component: LegalAgreements
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
