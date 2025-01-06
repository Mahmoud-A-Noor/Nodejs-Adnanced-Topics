const express = require('express');
const {
  createGroup,
  getAllGroups,
  getGroupById,
  updateGroup,
  deleteGroup,
} = require('../controllers/groupController');

const router = express.Router();

router.post('/', createGroup); // Create a new group
router.get('/', getAllGroups); // Get all groups
router.get('/:id', getGroupById); // Get a group by ID
router.put('/:id', updateGroup); // Update a group
router.delete('/:id', deleteGroup); // Delete a group

module.exports = router;
