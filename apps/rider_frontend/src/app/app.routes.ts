import { Route } from '@angular/router';
import {Login} from './login/login';
import {Register} from './register/register';
import {ApprovalWait} from './approvalWait/approvalWait';
import {AvailableOrders} from './availableOrders/availableOrders';
import {Wallet} from './wallet/wallet';

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
        path: '**',
        redirectTo: 'login',
    },
];
