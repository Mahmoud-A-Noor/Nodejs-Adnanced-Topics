const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();


// Enable CORS
app.use(cors());

// Serve static files (HTML, CSS) from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Server Sent Events endpoint
app.get('/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders(); // Flush the headers to establish the stream

  let counter = 0;

  // Send events to the client every 2 seconds
  const intervalId = setInterval(() => {
    counter++;
    res.write(`data: Hello, event number ${counter}\n\n`); // Send data to client
  }, 2000);

  // Clean up on connection close
  req.on('close', () => {
    clearInterval(intervalId); // Stop sending events when the connection is closed
    console.log('Client disconnected');
  });
});

// Basic route to serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
