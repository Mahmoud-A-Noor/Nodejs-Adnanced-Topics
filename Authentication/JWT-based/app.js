const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const app = express();

// Middleware setup
app.use(bodyParser.json()); // For parsing application/json

// Routes setup
app.use('/auth', authRoutes);
app.use('/user', userRoutes);

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
