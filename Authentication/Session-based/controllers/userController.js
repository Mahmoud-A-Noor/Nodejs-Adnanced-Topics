const db = require('../configs/db');

// Get user data (protected)
exports.getUser = (req, res) => {
  const userId = req.session.userId;

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const query = 'SELECT id, username FROM users WHERE id = ?';
  db.get(query, [userId], (err, user) => {
    if (err || !user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  });
};
