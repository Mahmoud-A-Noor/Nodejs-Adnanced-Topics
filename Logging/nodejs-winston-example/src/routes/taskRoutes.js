const express = require("express");
const taskController = require("../controllers/taskController");

const router = express.Router();

// Define routes and map them to controller functions
router.post("/", taskController.createTask); // Create a new task

module.exports = router;