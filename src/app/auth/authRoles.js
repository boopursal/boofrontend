/**
 * Authorization Roles
 */
const authRoles = {
    admin    : ['ROLE_ADMIN'],
    registe  : ['ROLE_ADMIN','ROLE_ACHETEUR', 'ROLE_FOURNISSEUR'],
    user     : ['ROLE_ADMIN', 'staff', 'user'],
    onlyGuest: []
};

export default authRoles;
