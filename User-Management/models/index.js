const sequelize = require('../config/database');
const User = require('./user');
const Role = require('./role');
const Group = require('./group');
const UserRole = require('./userRole');
const GroupRole = require('./groupRole');

// Associations
User.belongsToMany(Role, { through: UserRole });
Role.belongsToMany(User, { through: UserRole });

Group.belongsToMany(Role, { through: GroupRole });
Role.belongsToMany(Group, { through: GroupRole });

module.exports = { sequelize, User, Role, Group, UserRole, GroupRole };