const express = require('express');
const morganMiddleware = require('./configs/morgan');
const homeRoutes = require('./routes/homeRoutes');

const app = express();

// Middleware
app.use(express.json()); // For parsing JSON request bodies
app.use(morganMiddleware); // Advanced logging

// Routes
app.use('/', homeRoutes);

module.exports = app;
