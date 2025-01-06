const bcrypt = require('bcryptjs');
const db = require('../configs/db');

// Register a new user
exports.register = (req, res) => {
  const { username, password } = req.body;

  // Hash password before saving it to the DB
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ error: 'Error hashing password' });
    }

    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.run(query, [username, hashedPassword], (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error saving user' });
      }
      res.status(201).json({ message: 'User registered successfully' });
    });
  });
};

// Login user
exports.login = (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM users WHERE username = ?';
  db.get(query, [username], (err, user) => {
    if (err || !user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err || !isMatch) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }

      req.session.userId = user.id;
      res.status(200).json({ message: 'Logged in successfully' });
    });
  });
};

// Logout user
exports.logout = (req, res) => {
  console.log(req.session)
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Error logging out' });
    }
    res.status(200).json({ message: 'Logged out successfully' });
  });
};

exports.refreshSession = (req, res) => {
  if (req.session.userId) {
    // Renew session expiration by "touching" the session
    req.session.touch();
    return res.status(200).json({ message: 'Session refreshed' });
  }
  res.status(401).json({ error: 'User not authenticated' });
};