const express = require('express');
const { register, login, verifyToken, getProfile } = require('../controllers/authController');

const router = express.Router();

// Register a new user
router.post('/register', register);

// Login a user
router.post('/login', login);

// Protected route to get user profile
router.get('/profile', verifyToken, getProfile);

module.exports = router;
