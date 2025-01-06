const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { JWT_SECRET, JWT_EXPIRATION, JWT_REFRESH_EXPIRATION } = require('../configs/jwt');

// Register a new user
exports.register = (req, res) => {
  const { username, password } = req.body;

  User.findByUsername(username, (err, user) => {
    if (user) {
      return res.status(400).json({ error: 'Username already taken.' });
    }

    User.create(username, password, (err, userId) => {
      if (err) {
        return res.status(500).json({ error: 'Error creating user.' });
      }
      res.status(201).json({ message: 'User registered successfully.' });
    });
  });
};

// Login and return a JWT token
exports.login = (req, res) => {
  const { username, password } = req.body;

  User.findByUsername(username, (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Error finding user.' });
    }

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(400).json({ error: 'Invalid username or password.' });
    }

    const payload = { userId: user.id, username: user.username };
    const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
    const refreshToken = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_REFRESH_EXPIRATION });

    res.status(200).json({ message: 'Login successful', accessToken, refreshToken });
  });
};

// Refresh JWT token
exports.refreshToken = (req, res) => {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ error: 'Refresh token is required.' });
  }

  try {
    const decoded = jwt.verify(refreshToken, JWT_SECRET);
    const payload = { userId: decoded.userId, username: decoded.username };
    const newAccessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
    const newRefreshToken = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_REFRESH_EXPIRATION });

    res.status(200).json({ message: 'Tokens refreshed', accessToken: newAccessToken, refreshToken: newRefreshToken });
  } catch (err) {
    return res.status(400).json({ error: 'Invalid or expired refresh token.' });
  }
};
