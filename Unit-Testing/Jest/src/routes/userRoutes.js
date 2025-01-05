const express = require('express');
const {
  getUsers,
  createUser,
  getUserById,
  deleteUser,
} = require('../controllers/userController');

const router = express.Router();

router.get('/', getUsers);
router.post('/', createUser);
router.get('/:id', getUserById);
router.delete('/:id', deleteUser);

module.exports = router;
