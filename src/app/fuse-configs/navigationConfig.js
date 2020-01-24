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
                        'id': 'commandes-abonnements',
                        'title': 'Commandes abonnement',
                        'type': 'item',
                        'icon': 'inbox',
                        'url': '/admin/offres/commande',
                        'badge': {
                            'title': 'commandes-abonnements',
                            'bg': 'rgb(255, 111, 0)',
                            'fg': '#FFFFFF',
                            'count': 0
                        }
                       
                    },
                    {
                        'id': 'gestion-abonnements',
                        'title': 'Abonnements',
                        'type': 'item',
                        'icon': 'cloud',
                        'url': '/admin/offres/abonnement',
                       
                    },
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
    {
        'id': 'demandes-devis',
        'title': 'Demandes de devis',
        'auth': authRoles.admin,
        'type': 'item',
        'icon': 'inbox',
        'url': '/demandes_devis',
        'badge': {
            'title': 'demandes-devis',
            'bg': 'rgb(255, 111, 0)',
            'fg': '#FFFFFF',
            'count': 0
        }
    },
    {
        'id': 'validation_produits',
        'title': 'Validation des Produits',
        'auth': authRoles.admin,
        'type': 'item',
        'icon': 'shopping_cart',
        'url': '/products',
        'badge': {
            'title': 'validation_produits',
            'bg': 'rgb(255, 111, 0)',
            'fg': '#FFFFFF',
            'count': 0
        }

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
        'title': 'Demandes de devis',
        'auth': authRoles.acheteur,
        'type': 'item',
        'icon': 'inbox',
        'url': '/demandes'
    },
    {
        'id': 'black_listes_ha',
        'title': 'BlackListes',
        'auth': authRoles.acheteur,
        'type': 'item',
        'icon': 'work_off',
        'url': '/blacklistes'
    },
    {
        'id': 'mon_profil',
        'title': 'Profil',
        'auth': authRoles.acheteur,
        'type': 'item',
        'icon': 'person',
        'url': '/ac/profile'
    },
    /** FIN ACHETEUR Navigations */



    /** FOURNISSEUR Navigations */
    {
        'id': 'dashboard_fr',
        'title': 'Tableaux de bord',
        'auth': authRoles.fournisseur,
        'type': 'item',
        'icon': 'dashboard',
        'url': '/mydashboard'
    },
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
        'title': 'Consultations',
        'auth': authRoles.fournisseur,
        'type': 'item',
        'icon': 'move_to_inbox',
        'url': '/consultations',

    },
    {
        'id': 'mes_produits',
        'title': 'Produits',
        'auth': authRoles.fournisseur,
        'type': 'item',
        'icon': 'local_offer',
        'url': '/produits',

    },
    {
        'id': 'product-devis',
        'title': 'Demandes de devis',
        'auth': authRoles.fournisseur,
        'type': 'item',
        'icon': 'inbox',
        'url': '/product_devis',
        'badge': {
            'title': 'product-devis',
            'bg': 'rgb(255, 111, 0)',
            'fg': '#FFFFFF',
            'count': 0
        }
    },
    {
        'id': 'fr_profil',
        'title': 'Profil',
        'auth': authRoles.fournisseur,
        'type': 'item',
        'icon': 'person',
        'url': '/user/profile'
    },
    {
        'id': 'personnels-component',
        'title': 'Personnels',
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
                'id': 'offre-abonnement',
                'title': 'Abonnement',
                'type': 'item',
                'icon': 'cloud',
                exact    : true,
                'url': '/abonnement',
            },
            {
                'id': 'offre-commandes',
                'title': 'Vos commandes',
                'type': 'item',
                'icon': 'format_list_bulleted',
                'url': '/offres/commande',
            },
            {
                'id': 'fr-commandes',
                'title': 'Jetons',
                'type': 'item',
                'icon': 'control_point_duplicate',
                exact    : true,
                'url': '/abonnement/commandes',
            },

        ]

    },
    /** FIN FOURNISSEUR Navigations */

];

export default navigationConfig;
