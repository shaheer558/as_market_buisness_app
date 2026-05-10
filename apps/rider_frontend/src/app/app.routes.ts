import { Route } from '@angular/router';
import {Login} from './login/login';
import {Register} from './register/register';
import {ApprovalWait} from './approvalWait/approvalWait';
import {AvailableOrders} from './availableOrders/availableOrders';
import {Wallet} from './wallet/wallet';
import {AccountSettings} from './accountSettings/accountSettings';
import {OrderPreview} from './orderPreview/orderPreview';
import {ActiveTripMap} from './activeTripMap/activeTripMap';

export const appRoutes: Route[] = [
    {
        path: 'login',
        component: Login,
    },
    {
        path: 'register',
        component: Register,
    },
    {
        path: 'approval-wait',
        component: ApprovalWait,
    },
    {
        path: 'available-orders',
        component: AvailableOrders,
    },
    {
        path: 'wallet',
        component: Wallet,
    },
    {
        path: 'account-settings',
        component: AccountSettings,
    },
    {
        path: 'order-preview',
        component: OrderPreview,
    },
    {
        path: 'active-trip-map',
        component: ActiveTripMap,
    },
    {
        path: '**',
        redirectTo: 'login',
    },
];
