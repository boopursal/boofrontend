import { authRoles } from 'app/auth';
const navigationConfig = [

    /** Admin Navigation */

    {
        'id': 'demandes-admin',
        'title': 'Gestion des RFQs',
        'auth': authRoles.admin,
        'type': 'item',
        'icon': 'inbox',
        'url': '/demandes_admin',
        'badge': {
            'title': 'demandes-admin',
            'bg': 'rgb(255, 111, 0)',
            'fg': '#FFFFFF',
            'count': 0
        }
    },
    {
        'id': 'utilisateurs',
        'title': 'Utilisateur',
        'auth': authRoles.admin,
        'type': 'group',
        'icon': 'build',
        'children': [
            {
                'id': 'users',
                'title': 'Gestion des utilisateurs',
                'type': 'collapse',
                'icon': 'group',
                'children': [
                    {
                        'id': 'admins-component',
                        'title': 'Gestion des Admins',
                        'type': 'item',
                        'icon': 'verified_user',
                        'url': '/users/admin',
                    },
                    {
                        'id': 'zones-component',
                        'title': 'Gestion des Admins Comm.',
                        'type': 'item',
                        'icon': 'group',
                        'url': '/users/zones',
                    },
                    {
                        'id': 'commercial-component',
                        'title': 'Gestion des Comm.',
                        'type': 'item',
                        'icon': 'group',
                        'url': '/users/commercials',
                    },

                ]
            },

        ]
    },
    {
        'id': 'lesachatsindustriels',
        'title': 'Abonnements',
        'type': 'group',
        'auth': authRoles.admin,
        'children': [
            {

                'id': 'abonnement-fournisseur',
                'title': 'Fournisseurs',
                'type': 'collapse',
                'icon': 'work_outline',
                'badge': {
                    'title': 'abonnement-fournisseur',
                    'bg': 'rgb(255, 111, 0)',
                    'fg': '#FFFFFF',
                    'count': 0
                },
                'children': [
                    {
                        'id': 'commandes-jetons',
                        'title': 'Commandes jetons',
                        'type': 'item',
                        'icon': 'control_point_duplicate',
                        'url': '/admin/abonnement/commandes',
                        'badge': {
                            'title': 'commandes-jetons',
                            'bg': 'rgb(255, 111, 0)',
                            'fg': '#FFFFFF',
                            'count': 0
                        }
                    },
                    {
                        'id': 'fournisseur-jetons',
                        'title': 'Gestion des jetons',
                        'type': 'item',
                        'icon': 'monetization_on',
                        'url': '/admin/abonnement/jetons',
                    },
        
                ]
        
            },

        ]
    },
    {
        'id': 'configurer',
        'title': 'Configurer',
        'type': 'group',
        'auth': authRoles.admin,
        'icon': 'build',
        'children': [
            {
                'id': 'parametre',
                'title': 'Paramètres',
                'type': 'collapse',
                'icon': 'build',
                'children': [
                    {
                        'id': 'pays-component',
                        'title': 'Pays',
                        'type': 'item',
                        'icon': 'public',
                        'url': '/parametres/pays',
                    },
                    {
                        'id': 'villes-component',
                        'title': 'Villes',
                        'type': 'item',
                        'icon': 'location_city',
                        'url': '/parametres/villes',
                    },
                    {
                        'id': 'secturs-component',
                        'title': 'Secteurs',
                        'type': 'item',
                        'icon': 'work',
                        'url': '/parametres/secteurs',
                    },
                    {
                        'id': 'sous_secturs-component',
                        'title': 'Sous-Secteurs',
                        'type': 'item',
                        'icon': 'ballot',
                        'url': '/parametres/sous_secteurs',
                    },
                    {
                        'id': 'motifs-component',
                        'title': 'Motifs du rejet',
                        'type': 'item',
                        'icon': 'remove_circle_outline',
                        'url': '/parametres/motifs',
                    }
                ]
            },

        ]
    },

    /** Fin Admin Navigation */

    /** ACHETEUR Navigations */
    {
        'id': 'dashboard_ac',
        'title': 'Tableaux de bord',
        'auth': authRoles.acheteur,
        'type': 'item',
        'icon': 'dashboard',
        'url': '/dashboard_ac'
    },
    {
        'id': 'demandes_ha',
        'title': 'Mes demandes',
        'auth': authRoles.acheteur,
        'type': 'item',
        'icon': 'inbox',
        'url': '/demandes'
    },
    {
        'id': 'black_listes_ha',
        'title': 'Ma blackListes',
        'auth': authRoles.acheteur,
        'type': 'item',
        'icon': 'work_off',
        'url': '/blacklistes'
    },
    {
        'id': 'mon_profil',
        'title': 'Mon profil',
        'auth': authRoles.acheteur,
        'type': 'item',
        'icon': 'person',
        'url': '/ac/profile'
    },
    /** FIN ACHETEUR Navigations */



    /** FOURNISSEUR Navigations */

    {
        'id': 'demandes_prix',
        'title': 'Demande de prix',
        'auth': authRoles.fournisseur,
        'type': 'item',
        'icon': 'inbox',
        'url': '/demandes_prix',
        'badge': {
            'title': 'demandes_prix',
            'bg': 'rgb(9, 210, 97)',
            'fg': '#FFFFFF',
            'count': 0
        }
    },
    {
        'id': 'mes_consultations',
        'title': 'Mes consultations',
        'auth': authRoles.fournisseur,
        'type': 'item',
        'icon': 'move_to_inbox',
        'url': '/consultations',

    },
    {
        'id': 'mes_produits',
        'title': 'Mes Produits',
        'auth': authRoles.fournisseur,
        'type': 'item',
        'icon': 'shopping_cart',
        'url': '/produits',

    },
    {
        'id': 'fr_profil',
        'title': 'Mon profil',
        'auth': authRoles.fournisseur,
        'type': 'item',
        'icon': 'person',
        'url': '/user/profile'
    },
    {
        'id': 'personnels-component',
        'title': 'Gestion des Personnels',
        'auth': authRoles.fournisseur,
        'type': 'item',
        'icon': 'group',
        'url': '/fournisseur/personnel',
    },
    {

        'id': 'abonnement',
        'title': 'Les achats industriels',
        'type': 'collapse',
        'auth': authRoles.fournisseur,
        'icon': 'cloud',
        'children': [
            {
                'id': 'fr-commandes',
                'title': 'Mes commandes',
                'type': 'item',
                'icon': 'control_point_duplicate',
                'url': '/abonnement/commandes',
            },

        ]

    },
    /** FIN FOURNISSEUR Navigations */

];

export default navigationConfig;
