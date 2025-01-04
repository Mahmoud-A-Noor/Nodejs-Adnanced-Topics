let tasks = [];
let currentId = 1;
const { logger } = require('../configs/Logger');
// Create a new task
exports.createTask = (req, res) => {
    const { title, description } = req.body;
    logger.info('Start Creating Task...');

    if (!title || !description) {
        const childLogger = logger.child({ requestId: 'f9ed4675f1c53513c61a3b3b4e25b4c0' });
        childLogger.error('Title and description are required.');
        return res.status(400).json({ message: "Title and description are required." });
    }

    const newTask = { id: currentId++, title, description, completed: false };
    tasks.push(newTask);

    const childLogger = logger.child({ requestId: 'f9ed4675f1c53513c61a3b3b4e25b4c0' });
    childLogger.info('Task Created successfully', {
    title: title,
    description: description,
    userId: 'jdn33d8h2',
    });
  res.status(201).json(newTask);
};