const db = require('../configs/db');
const bcrypt = require('bcryptjs');

const User = {
  // Create a new user in the database
  create: (username, password, callback) => {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.run(sql, [username, hashedPassword], function (err) {
      callback(err, this.lastID);
    });
  },

  // Find a user by username
  findByUsername: (username, callback) => {
    const sql = 'SELECT * FROM users WHERE username = ?';
    db.get(sql, [username], (err, user) => {
      callback(err, user); // Pass user data to the callback function
    });
  },
};

module.exports = User;
