const app = require('./app');  // Import the app created in app.js

const PORT = process.env.PORT || 5000;  // Default to port 5000 if not set in the environment

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});