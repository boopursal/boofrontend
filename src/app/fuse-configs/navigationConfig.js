import {authRoles} from 'app/auth';
const navigationConfig = [
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
            }
        ]
    },
    {
        'id'      : 'utilisateurs',
        'title'   : 'Utilisateur',
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
    
];

export default navigationConfig;
