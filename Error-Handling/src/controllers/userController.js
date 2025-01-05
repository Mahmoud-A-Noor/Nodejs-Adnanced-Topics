const UserModel = require('../models/userModel');
const Joi = require('joi');

// Validation schema
const userSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().min(6).max(30).required(),
});



async function createUser(req, res, next) {
  try {
    // Validate incoming data
    const { error } = userSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const newUser = UserModel.createUser(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    // Forward errors to the error handler middleware
    next(err);
  }
}

async function getUser(req, res, next) {
  try {
    const userId = parseInt(req.params.id, 10);
    const user = UserModel.getUserById(userId);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createUser,
  getUser,
};
