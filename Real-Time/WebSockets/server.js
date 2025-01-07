const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files (HTML, CSS) from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Basic route to serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// WebSocket connection
io.on('connection', (socket) => {
  console.log('A user connected');
  
  let counter = 0;

  // Send an event to the client every 2 seconds
  const intervalId = setInterval(() => {
    counter++;
    socket.emit('message', `Hello, event number ${counter}`); // Send data to client
  }, 2000);

  // Clean up when the connection is closed
  socket.on('disconnect', () => {
    clearInterval(intervalId); // Stop sending events when the client disconnects
    console.log('User disconnected');
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
