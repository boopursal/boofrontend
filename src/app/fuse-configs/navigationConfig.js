import {authRoles} from 'app/auth';
const navigationConfig = [

    /** Admin Navigation */
    {
        'id'      : 'administration',
        'title'   : 'Administration',
        'type'    : 'group',
        'icon'    : 'apps',
        'children': [
            {
                'id'   : 'example-component',
                'title': 'Example',
                'type' : 'item',
                'icon' : 'whatshot',
                'url'  : '/example',
                'badge': {
                    'title': 'example-component',
                    'bg'   : 'rgb(255, 111, 0)',
                    'fg'   : '#FFFFFF',
                    'count':0
                }
            }
        ]
    },
    {
        'id'      : 'demandes-admin',
        'title'   : 'Gestion des RFQs',
        'auth' : authRoles.admin,        
        'type'    : 'item',
        'icon'    : 'inbox',
        'url'  : '/demandes_admin',
        'badge': {
            'title': 'demandes-admin',
            'bg'   : 'rgb(255, 111, 0)',
            'fg'   : '#FFFFFF',
            'count':0
        }
    },
    {
        'id'      : 'utilisateurs',
        'title'   : 'Utilisateur',
        'auth' : authRoles.admin,        
        'type'    : 'group',
        'icon'    : 'build',
        'children': [
            {
                'id'      : 'users',
                'title'   : 'Gestion des utilisateurs',
                'type'    : 'collapse',
                'icon'    : 'group',
                'children': [                    
                    {
                        'id'   : 'admins-component',
                        'title': 'Gestion des Admins',
                        'type' : 'item',
                        'icon' : 'verified_user',
                        'url'  : '/users/admin',
                    },
                    {
                        'id'   : 'zones-component',
                        'title': 'Gestion des Admins Comm.',
                        'type' : 'item',
                        'icon' : 'group',
                        'url'  : '/users/zones',
                    },
                    {
                        'id'   : 'commercial-component',
                        'title': 'Gestion des Comm.',
                        'type' : 'item',
                        'icon' : 'group',
                        'url'  : '/users/commercials',
                    },
                    
                ]
            },
            
        ]
    },
    
    {
        'id'      : 'configurer',
        'title'   : 'Configurer',
        'type'    : 'group',
        'auth' : authRoles.admin,
        'icon'    : 'build',
        'children': [
            {
                'id'      : 'parametre',
                'title'   : 'Paramètres',
                'type'    : 'collapse',
                'icon'    : 'build',
                'children': [                    
                    {
                        'id'   : 'pays-component',
                        'title': 'Pays',
                        'type' : 'item',
                        'icon' : 'public',
                        'url'  : '/parametres/pays',
                    },
                    {
                        'id'   : 'villes-component',
                        'title': 'Villes',
                        'type' : 'item',
                        'icon' : 'location_city',
                        'url'  : '/parametres/villes',
                    },
                    {
                        'id'   : 'secturs-component',
                        'title': 'Secteurs',
                        'type' : 'item',
                        'icon' : 'work',
                        'url'  : '/parametres/secteurs',
                    },
                    {
                        'id'   : 'sous_secturs-component',
                        'title': 'Sous-Secteurs',
                        'type' : 'item',
                        'icon' : 'ballot',
                        'url'  : '/parametres/sous_secteurs',
                    }
                ]
            },
            
        ]
    },
    
    /** Fin Admin Navigation */
    /** ACHETEUR Navigations */
    {
        'id'      : 'demandes_ha',
        'title'   : 'Mes demandes',
        'auth' : authRoles.acheteur,        
        'type'    : 'item',
        'icon'    : 'inbox',
        'url'  : '/demandes'
    },
    /** FIN ACHETEUR Navigations */
    
];

export default navigationConfig;
