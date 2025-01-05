const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Route to create a user
router.post('/', userController.createUser);

// Route to get a user by ID
router.get('/:id', userController.getUser);

module.exports = router;
