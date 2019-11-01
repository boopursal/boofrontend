import React from 'react';
import {authRoles} from 'app/auth';


export const Step3AppConfig = 
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
            path     : '/register/step3',
            component: React.lazy(() => import('./Step3App'))
        }
    ]
};
