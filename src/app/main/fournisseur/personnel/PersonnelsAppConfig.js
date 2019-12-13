import React from 'react';
import {authRoles} from 'app/auth';

export const PersonnelsAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    auth    : authRoles.fournisseur,
    routes  : [
        {
            path     : '/fournisseur/personnel',
            component: React.lazy(() => import('./PersonnelsApp'))
        }
    ]
};
