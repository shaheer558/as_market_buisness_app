import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { App } from './app';
import { appRoutes } from './app.routes';
import { NxWelcome } from './nx-welcome';
import { SystemConfig } from './system-config/system-config';
import { FormResetEvent, FormsModule } from '@angular/forms';
import { FormField, FieldState, FormRoot } from '@angular/forms/signals';
import { LiveMap } from './live-map/live-map';
import { ExtraBudgetAllocation } from './extra-budget-allocation/extra-budget-allocation';
import { OrdersMessages } from './orders-messages/orders-messages';
import { OrderDetail } from './order-detail/order-detail';
import { Complaints } from './complaints/complaints';
import { PriceUpdateApprovals } from './price-update-approvals/price-update-approvals';
import { FinancialReports } from './financial-reports/financial-reports';
import { BaseWiseStats } from './base-wise-stats/base-wise-stats';
import { AppTreasure } from './app-treasure/app-treasure';
import { BudgetsPlans } from './budgets-plans/budgets-plans';
import { DiscountEvents } from './discount-events/discount-events';
import { LegalAgreements } from './legal-agreements/legal-agreements';

@NgModule({
  declarations: [
    App,
    NxWelcome,
    SystemConfig,
    LiveMap,
    ExtraBudgetAllocation,
    OrdersMessages,
    OrderDetail,
    Complaints,
    PriceUpdateApprovals,
    FinancialReports,
    BaseWiseStats,
    AppTreasure,
    BudgetsPlans,
    DiscountEvents,
    LegalAgreements,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    FormField,
    FormRoot,
  ],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
  exports: [
    SystemConfig,
    LiveMap,
    ExtraBudgetAllocation,
    OrdersMessages,
    OrderDetail,
    Complaints,
    PriceUpdateApprovals,
    FinancialReports,
    BaseWiseStats,
    AppTreasure,
    BudgetsPlans,
    DiscountEvents,
    LegalAgreements,
  ],
})
export class AppModule {}
