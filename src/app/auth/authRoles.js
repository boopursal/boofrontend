/**
 * Authorization Roles
 */
const authRoles = {
    admin    : ['ROLE_ADMIN'],
    staff    : ['ROLE_ADMIN', 'staff'],
    user     : ['ROLE_ADMIN', 'staff', 'user'],
    onlyGuest: []
};

export default authRoles;
