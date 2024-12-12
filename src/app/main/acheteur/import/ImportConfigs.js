import React from 'react';
import { authRoles } from 'app/auth';

export const ImportConfigs = {
    settings: {
        layout: {}
    },
    auth: authRoles.acheteur, // Ou tout autre rôle approprié pour l'importation
    routes: [
        {
            path: '/ac/import', // Chemin pour accéder à la page d'importation
            component: React.lazy(() => import('./Import')) // Composant Import
        },
    ]
};
