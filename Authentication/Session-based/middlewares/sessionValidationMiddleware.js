module.exports = (req, res, next) => {
    // Check if the userId exists in the session
    if (!req.session.userId) {
      return res.status(401).json({ error: 'Session expired. Please log in again.' });
    }
    next();  // Proceed to the next middleware/route handler
};