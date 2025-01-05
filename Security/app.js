const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const hpp = require('hpp');
const csurf = require('csurf');
const userController = require('./src/controllers/userController');
const validateInput = require('./src/middlewares/validateInput');

const app = express();
const csrfProtection = csurf({ cookie: true });

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
////* Key Security Mechanisms Implemented *////
// Request Size Limit:
// The body parser limits request size to 10 KB using { limit: '10kb' }.

// Input Validation:
// Using express-validator, we validate the email and password fields during the signup process.

// Non-Blocking Event Loop:
// By using asynchronous methods (bodyParser, route handling), we ensure that we do not block the event loop.

// Output Escaping:
// By using Helmet, we protect against XSS attacks by setting appropriate security headers.

// Anti-CSRF Tokens:
// Using the csrf library, we include an anti-CSRF token in the form and check the token on submission to ensure the request is legitimate.

// Prevent HTTP Parameter Pollution:
// By using proper validation and parsing logic, the app will only accept single-value parameters per request. For example, if multiple values are sent in the same parameter (like email=abc&email=xyz), the application will reject them based on validation logic.

// Security Headers using Helmet
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.use(helmet());

// Body parser for JSON requests
app.use(bodyParser.json({ limit: '10kb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser()); // Required for csurf

app.use(hpp()); // Prevent HTTP Parameter Pollution

// CSRF token middleware
app.use(csrfProtection);

app.set('view engine', 'ejs');

// Routes
app.get('/signup', userController.showSignupPage);
app.post('/signup', validateInput, userController.signup); // Middleware used here

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
