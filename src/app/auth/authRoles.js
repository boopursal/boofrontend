/**
 * Authorization Roles
 */
const authRoles = {
    admin           : ['ROLE_ADMIN'],
    acheteur_pre    : ['ROLE_ACHETEUR_PRE'],
    acheteur        : ['ROLE_ACHETEUR_PRE'],
    fournisseur_pre : ['ROLE_FOURNISSEUR_PRE'],
    fournisseur     : ['ROLE_FOURNISSEUR'],
    registe         : ['ROLE_ACHETEUR', 'ROLE_FOURNISSEUR'],
    onlyGuest: []
};

export default authRoles;
