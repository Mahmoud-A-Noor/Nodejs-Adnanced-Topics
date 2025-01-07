const jwt = require('jsonwebtoken');
const { UserRoles, GroupRoles, Roles, Groups } = require('../models'); // Adjust path to match your Sequelize models

const authorize = ({ role = null, group = null } = {}) => {
  return async (req, res, next) => {
    try {
      // Extract the JWT token from the Authorization header
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
      }

      // Decode and verify the JWT token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.id;
      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
      }

      // Initialize checks
      let hasRequiredRole = !role; // If no role is specified, skip role check
      let belongsToGroup = !group; // If no group is specified, skip group check

      // Check for roles if role is provided
      if (role) {
        const userRoles = await UserRoles.findAll({
          where: { UserId: userId },
          include: [{ model: Roles, where: { name: role }, attributes: ['id', 'name'] }],
        });

        hasRequiredRole = userRoles.length > 0;
      }

      // Check for groups if group is provided
      if (group) {
        const groupRoles = await GroupRoles.findAll({
          include: [
            {
              model: Groups,
              where: { name: group },
              attributes: ['id', 'name'],
            },
            {
              model: UserRoles,
              where: { UserId: userId },
              attributes: [],
            },
          ],
        });

        belongsToGroup = groupRoles.length > 0;
      }

      if((!role && !belongsToGroup) || (!group && !hasRequiredRole) || (!hasRequiredRole && !belongsToGroup)) {
        return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
      }

      // User is authorized, proceed to the next middleware
      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Unauthorized: Invalid token or permissions' });
    }
  };
};

module.exports = authorize;
