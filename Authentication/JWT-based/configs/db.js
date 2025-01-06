const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create and connect to the SQLite database
const db = new sqlite3.Database(path.join(__dirname, '..', 'database.db'), (err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Create a table for users if it doesn't exist
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      password TEXT NOT NULL
    )`);
});


module.exports = db;
