
import React from 'react';
import {authRoles} from 'app/auth';

export const commandeAbonnementConfigs = {
    settings: {
        layout: {}
    },
    auth    : authRoles.fournisseur,
    routes  : [
        {
            path     : '/offres/commande/:commandeId/',
            component: React.lazy(() => import('./commandeAbonnement/Commande'))
        },
        {
            path     : '/offres/commande',
            component: React.lazy(() => import('./commandesAbonnement/Commandes'))
        }
    ]
};
