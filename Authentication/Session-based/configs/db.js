const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create a new SQLite database (or connect to it)
const db = new sqlite3.Database(path.join(__dirname, '../database.db'), (err) => {
  if (err) {
    console.error("Error opening database", err);
  } else {
    console.log("Connected to SQLite database");
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