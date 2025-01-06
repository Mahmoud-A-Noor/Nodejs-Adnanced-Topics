const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const Role = require('./role');

const UserRole = sequelize.define('UserRole', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
}, { timestamps: false });

module.exports = UserRole;