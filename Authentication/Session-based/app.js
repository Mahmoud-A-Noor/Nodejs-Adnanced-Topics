const express = require('express');
const sessionValidationMiddleware = require('./middlewares/sessionValidationMiddleware');
const session = require('express-session');
const sessionConfig = require('./configs/session');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const bodyParser = require('body-parser');

const app = express();

// Middleware setup
app.use(bodyParser.json());
app.use(session(sessionConfig));

// Routes
app.use('/auth', authRoutes);
app.use('/user', sessionValidationMiddleware, userRoutes);

// Start server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
