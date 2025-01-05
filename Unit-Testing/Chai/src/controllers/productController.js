exports.getProducts = (req, res) => {
    res.status(200).json([{ id: 1, name: 'Laptop' }, { id: 2, name: 'Phone' }]);
};

exports.addProduct = (req, res) => {
    const { name } = req.body;
    res.status(201).json({ id: Math.random(), name });
};
