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
                'url'  : '/example'
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
        'id'      : 'dashboard_ac',
        'title'   : 'Tableaux de bord',
        'auth' : authRoles.acheteur,        
        'type'    : 'item',
        'icon'    : 'dashboard',
        'url'  : '/dashboard_ac'
    },
    {
        'id'      : 'demandes_ha',
        'title'   : 'Mes demandes',
        'auth' : authRoles.acheteur,        
        'type'    : 'item',
        'icon'    : 'inbox',
        'url'  : '/demandes'
    },
    {
        'id'      : 'black_listes_ha',
        'title'   : 'Ma blackListes',
        'auth' : authRoles.acheteur,        
        'type'    : 'item',
        'icon'    : 'work_off',
        'url'  : '/blacklistes'
    },
    {
        'id'      : 'mon_profil',
        'title'   : 'Mon profil',
        'auth' : authRoles.acheteur,        
        'type'    : 'item',
        'icon'    : 'person',
        'url'  : '/ac/profile'
    },
    /** FIN ACHETEUR Navigations */



     /** FOURNISSEUR Navigations */
    
    {
        'id'      : 'demandes_prix',
        'title'   : 'Demande de prix',
        'auth' : authRoles.fournisseur,        
        'type'    : 'item',
        'icon'    : 'inbox',
        'url'  : '/demandes_prix',
        'badge': {
            'title': 'demandes_prix',
            'bg'   : 'rgb(9, 210, 97)',
            'fg'   : '#FFFFFF',
            'count':0
        }
    },
   
    /** FIN FOURNISSEUR Navigations */
    
];

export default navigationConfig;
