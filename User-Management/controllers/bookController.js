const { Book } = require('../models');

// Create a book
const createBook = async (req, res, next) => {
  try {
    const { title, author, price } = req.body;
    const book = await Book.create({ title, author, price });
    res.status(201).json(book);
  } catch (err) {
    next(err);
  }
};

// Get all books
const getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (err) {
    next(err);
  }
};

// Get a single book by ID
const getBookById = async (req, res, next) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) {
    next(err);
  }
};

// Update a book
const updateBook = async (req, res, next) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    await book.update(req.body);
    res.json(book);
  } catch (err) {
    next(err);
  }
};

// Delete a book
const deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    await book.destroy();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
};
