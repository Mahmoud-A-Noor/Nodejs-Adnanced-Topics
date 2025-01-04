const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: 'Express API with Swagger',
      version: '1.0.0',
      description: 'API Documentation for Express Project with Swagger',
    },
    host: `localhost:${process.env.PORT}`,
    basePath: '/',
  },
  apis: ['src/routes/*.js', 'src/models/*.js'], // Absolute Path to the API docs(routes files)
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// Connect to MongoDB
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error: ', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
