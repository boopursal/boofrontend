import React from 'react';
import { authRoles } from 'app/auth';

export const SuggestionsAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    auth: authRoles.acheteur,
    routes: [
        {
            path: '/acheteur/suggetion',
            component: React.lazy(() => import('./SuggestionsApp'))
        }
        
        /*,
        {
            path: '/suggetions',
            component: React.lazy(() => import('./SuiviSuggetion'))
        }*/
    ]
};
