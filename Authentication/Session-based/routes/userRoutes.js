const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Protected route to get user info
router.get('/profile', userController.getUser);

module.exports = router;
