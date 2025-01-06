const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Protected route for getting user data
router.get('/me', authMiddleware, userController.getUser);

module.exports = router;
