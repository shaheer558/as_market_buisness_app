import { Route } from '@angular/router';
import {Login} from './login/login';
import {Register} from './register/register';
import {ApprovalWait} from './approvalWait/approvalWait';

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
        path: '**',
        redirectTo: 'login',
    },
];
