const express = require('express');
const process = require('process');
const userRoutes = require('./routes/userRoutes');
const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();

app.use(express.json());
app.use('/users', userRoutes);


// Global error handler middleware
app.use(errorMiddleware);


//? Why It’s Generally Recommended to Shut Down on Critical Errors: *//
// 1- Prevent Data Corruption: When the app encounters unexpected errors, 
//    especially unhandled exceptions or unhandled promise rejections, 
//    it may be in an inconsistent or unstable state. 
//    Continuing to run the application without fixing the issue could lead to data corruption, 
//    incorrect behavior, or leaking sensitive information.
// 2- Graceful Restart: In production environments, using a process manager like PM2, Docker, or Kubernetes is common. 
//    These tools can automatically restart the application if it crashes, 
//    allowing for a quick recovery while minimizing downtime.

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error.message);
  // Perform cleanup tasks if necessary
  process.exit(1); // Exiting the application
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
  process.exit(1);
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// For critical, unrecoverable errors (e.g., memory issues, database connectivity failure), 
// shutting down the app might be the best option to prevent further damage and allow a fresh restart.

// For non-fatal errors, the server should ideally continue running, log the errors, 
// and return appropriate error responses to clients without shutting down the entire service.

// Always have monitoring and alerting systems in place to track errors and automatically trigger recovery mechanisms, 
// such as restarts, when necessary.