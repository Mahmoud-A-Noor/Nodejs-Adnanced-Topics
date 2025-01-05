const { validationResult } = require('express-validator');

// Handle GET request to show the signup page
exports.showSignupPage = (req, res) => {
  res.render('signup', { csrfToken: req.csrfToken() });
};

// Handle POST request to sign up the user
exports.signup = (req, res) => {
  // Handle validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Simulate saving the user to the database
  res.status(201).send('User signup successful!');
};
