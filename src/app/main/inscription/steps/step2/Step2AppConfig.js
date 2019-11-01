import React from 'react';
import {authRoles} from 'app/auth';


export const Step2AppConfig = 
{
    settings: {
        layout: {
            config: {
                navbar        : {
                    display: false
                },
                toolbar       : {
                    display: false
                },
                footer        : {
                    display: false
                },
                leftSidePanel : {
                    display: false
                },
                rightSidePanel: {
                    display: false
                }
            }
        }
    },
    auth    : authRoles.registe,
    routes  : [
        {
            path     : '/register/step2',
            component: React.lazy(() => import('./Step2App'))
        }
    ]
};
