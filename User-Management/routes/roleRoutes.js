const express = require('express');
const {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole,
} = require('../controllers/roleController');

const router = express.Router();

router.post('/', createRole); // Create a new role
router.get('/', getAllRoles); // Get all roles
router.get('/:id', getRoleById); // Get a specific role by ID
router.put('/:id', updateRole); // Update a role by ID
router.delete('/:id', deleteRole); // Delete a role by ID

module.exports = router;
