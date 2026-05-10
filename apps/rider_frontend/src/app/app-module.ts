import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { App } from './app';
import { appRoutes } from './app.routes';
import { NxWelcome } from './nx-welcome';
import { Login } from './login/login';
import { NgOptimizedImage } from '@angular/common';
import { Register } from './register/register';
import { FormField } from '@angular/forms/signals';
import { ApprovalWait } from './approvalWait/approvalWait';
import { AvailableOrders } from './availableOrders/availableOrders';
import { Wallet } from './wallet/wallet';
import { AccountSettings } from './accountSettings/accountSettings';
import { OrderPreview } from './orderPreview/orderPreview';
import { ActiveTripMap } from './activeTripMap/activeTripMap';
import { OrderSequence } from './order-sequence/order-sequence';

@NgModule({
  declarations: [
    App,
    NxWelcome,
    Login,
    Register,
    ApprovalWait,
    AvailableOrders,
    Wallet,
    AccountSettings,
    OrderPreview,
    ActiveTripMap,
    OrderSequence,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    NgOptimizedImage,
    FormField,
    FormsModule,
  ],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
  exports: [
    Login,
    Register,
    ApprovalWait,
    AvailableOrders,
    Wallet,
    AccountSettings,
    OrderPreview,
    ActiveTripMap,
    OrderSequence,
  ],
})
export class AppModule {}
