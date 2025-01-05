exports.getUsers = (req, res) => {
    res.status(200).json([{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Doe' }]);
};

exports.addUser = (req, res) => {
    const { name } = req.body;
    res.status(201).json({ id: Math.random(), name });
};
