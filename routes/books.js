const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const User = require('../models/User');
const Book = require('../models/Book');
const mongoose = require('mongoose');

// @Route   GET /api/books
// @Desc    Get all Books
// @access  Private

router.get('/', auth, async (req, res) => {
  try {
    const books = await Book.find({ user: req.user.id }).sort({ date: -1 });
    res.json(books);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @Route   POST /api/books
// @Desc    add a book
// @access  Private

router.post(
  '/',
  [
    auth,
    [
      body('title', 'Title is required').not().isEmpty(),
      body('author', 'Author is required').not().isEmpty(),
      body('isbn', 'ISBN is required').isLength({ min: 13, max: 13 }),
      body('date', 'Date is required'),
      body('description', 'Description is Required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, author, isbn, date, description } = req.body;

    try {
      const newBook = await new Book({
        title,
        author,
        isbn,
        date,
        description,
        user: req.user.id,
      });

      const book = await newBook.save();
      res.json({ book: book, msg: 'Book Addded!' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @Route   PUT /api/books:id
// @Desc    Update book
// @access  Private

router.put('/:id', auth, async (req, res) => {
  const { title, author, isbn, date, description } = req.body;

  // Build contact Object
  const bookFields = {};
  if (title) bookFields.title = title;
  if (author) bookFields.author = author;
  if (isbn) bookFields.isbn = isbn;
  if (date) bookFields.date = date;
  if (description) bookFields.description = description;

  try {
    let book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ msg: 'Book not found' });
    }

    // Make sure user owns book
    if (book.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not Authorized' });
    }

    if (title !== book.title) {
      //Prevents error
      mongoose.set('useFindAndModify', false);

      book = await Book.findByIdAndUpdate(
        req.params.id,
        { $set: bookFields },
        { new: true }
      );

      res.json({ book: book, msg: 'The book was successfully updated!' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @Route   DELETE /api/books
// @Desc    Delete book
// @access  Private

router.delete('/:id', auth, async (req, res) => {
  try {
    let book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ msg: 'Book not found' });
    }

    // Make sure user owns book
    if (book.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not Authorized' });
    }

    //Prevents error
    mongoose.set('useFindAndModify', false);

    await Book.findByIdAndRemove(req.params.id);
    res.json({ msg: 'The book was successfully deleted!' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
