
import React from 'react';
import {authRoles} from 'app/auth';

export const demandeDevisConfigs = {
    settings: {
        layout: {}
    },
    auth    : authRoles.admin,
    routes  : [
        {
            path     : '/demandes_devis/:demandeId/',
            component: React.lazy(() => import('./demande_devis/DemandeDevis'))
        },
        {
            path     : '/demandes_devis',
            component: React.lazy(() => import('./demandes_devis/DemandesDevis'))
        }
    ]
};
