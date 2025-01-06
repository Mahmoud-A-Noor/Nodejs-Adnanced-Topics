require('dotenv').config();

module.exports = {
  JWT_SECRET: process.env.JWT_SECRET || 'your_secret_key', // Make sure to change this in production
  JWT_EXPIRATION: process.env.JWT_EXPIRATION || '1h', // Set token expiration time
  JWT_REFRESH_EXPIRATION: process.env.JWT_REFRESH_EXPIRATION || '7d', // Set refresh token expiration time
};