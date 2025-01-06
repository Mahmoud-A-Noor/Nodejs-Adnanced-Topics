// Protected route for getting user data
exports.getUser = (req, res) => {
    res.status(200).json({ user: req.user }); // req.user is populated by the authMiddleware
};
  