const allRoles = {
  user: ['getLinks', 'manageLinks'],
  admin: ['getUsers', 'manageUsers', 'getLinks', 'manageLinks'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
