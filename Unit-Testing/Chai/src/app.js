const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());

// Connect to database
connectDB();

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

// Default route
app.get('/', (req, res) => res.send('API is running...'));

module.exports = app;
