import React from 'react';
import { authRoles } from 'app/auth';

export const FacturationAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    auth: authRoles.acheteur,
    routes: [
        {
            path: '/facturation/:tab?',
            component: React.lazy(() => import('./FacturationApp'))
        }
    ]
};
