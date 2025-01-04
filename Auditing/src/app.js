const express = require('express');
const auditEmitter = require('./utils/eventEmitter');      // Event emitter for auditing
const { saveAuditLog } = require('./services/auditService'); // Service to save logs to DB
const connectDB = require('./config/DB');                 // DB connection
const auditMiddleware = require('./middlewares/auditMiddleware');
require('dotenv').config();                                 // For accessing .env variables

// Connect to the database
connectDB();

const app = express();

// Middleware for parsing JSON (you can add auditMiddleware here if you wish)
app.use(express.json());
app.use(auditMiddleware)

// Event Listener for Auditing
auditEmitter.on('audit', (log) => {
    saveAuditLog(log); // Save log to DB asynchronously
    console.log('Audit Log:', log);
});

// User Routes (Assume you have routes set up here)
app.use('/users', require('./routes/userRoutes'));

module.exports = app;