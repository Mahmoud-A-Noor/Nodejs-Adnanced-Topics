const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../configs/jwt');

// Middleware to validate JWT token
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Extract token from header

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach decoded user info to the request object
    next(); // Continue to the next middleware/route handler
  } catch (err) {
    return res.status(400).json({ error: 'Invalid or expired token.' });
  }
};

module.exports = authMiddleware;
