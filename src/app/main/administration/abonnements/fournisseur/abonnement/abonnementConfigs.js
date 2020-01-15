
import React from 'react';
import {authRoles} from 'app/auth';

export const abonnementConfigs = {
    settings: {
        layout: {}
    },
    auth    : authRoles.admin,
    routes  : [
        {
            path     : '/admin/offres/abonnement/:abonnementId/',
            component: React.lazy(() => import('./abonnement/Abonnement'))
        },
        {
            path     : '/admin/offres/abonnement',
            component: React.lazy(() => import('./abonnements/Abonnements'))
        }
    ]
};
