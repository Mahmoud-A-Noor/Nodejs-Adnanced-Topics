const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Group = require('./group');
const Role = require('./role');

const GroupRole = sequelize.define('GroupRole', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
}, { timestamps: false });

module.exports = GroupRole;