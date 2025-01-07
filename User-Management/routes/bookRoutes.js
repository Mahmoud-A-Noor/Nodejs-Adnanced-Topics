const express = require('express');
const { createBook, getAllBooks, getBookById, updateBook, deleteBook } = require('../controllers/bookController');
const authorize = require('../middlewares/authorizeMiddleware');
const router = express.Router();

router.post('/', authorize({ role: 'author', group: 'Team A' }), createBook);
router.get('/', authorize({ role: 'author'}), getAllBooks);
router.get('/:id', authorize({group: 'Team A' }), getBookById);
router.put('/:id', authorize({ role: 'author', group: 'Team A' }), updateBook);
router.delete('/:id', deleteBook);

module.exports = router;
