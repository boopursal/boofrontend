import React from 'react';


export const InscriptionConfig = {
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
    routes  : [
       
        {
            exact :true,
            path     : '/register/confirm/:confirmationToken',
            component: React.lazy(() => import('./ConfirmPage'))
        },
        {
            exact :true,
            path     : '/register',
            component: React.lazy(() => import('./RegisterPage'))
        },
        {
            exact :true,
            path     : '/mail-confirm',
            component: React.lazy(() => import('./MailConfirmPage'))
        }
        
    ]
};