import { Route } from '@angular/router';
import {Login} from './login/login';
import {Register} from './register/register';
import {ApprovalWait} from './approvalWait/approvalWait';
import {AvailableOrders} from './availableOrders/availableOrders';
import {Wallet} from './wallet/wallet';
import {AccountSettings} from './accountSettings/accountSettings';
import {OrderPreview} from './orderPreview/orderPreview';
import {ActiveTripMap} from './activeTripMap/activeTripMap';
import {OrderSequence} from './order-sequence/order-sequence';
import {IncidentReport} from './incident-report/incident-report';
import {PriceUpdateForm} from './price-update-form/price-update-form';
import {ShopStop} from './shop-stop/shop-stop';
import {CustomerStop} from './customer-stop/customer-stop';
import {DeviationProof} from './deviation-proof/deviation-proof';
import {ReturnRoute} from './return-route/return-route';

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
        path: 'order-sequence',
        component: OrderSequence,
    },
    {
        path: 'incident-report',
        component: IncidentReport,
    },
    {
        path: 'price-update-form',
        component: PriceUpdateForm,
    },
    {
        path: 'shop-stop',
        component: ShopStop,
    },
    {
        path: 'customer-stop',
        component: CustomerStop,
    },
    {
        path: 'deviation-proof',
        component: DeviationProof,
    },
    {
        path: 'return-route',
        component: ReturnRoute,
    },
    {
        path: '**',
        redirectTo: 'login',
    },
];
