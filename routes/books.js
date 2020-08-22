const express = require('express');
const router = express.Router();

// @Route   GET /api/books
// @Desc    Get all Books
// @access  Private

router.get('/', (req, res) => {
  res.send('Get all Books');
});

// @Route   POST /api/books
// @Desc    add a book
// @access  Private

router.post('/', (req, res) => {
  res.send('Add a book');
});

// @Route   PUT /api/books:id
// @Desc    Update book
// @access  Private

router.put('/:id', (req, res) => {
  res.send('Update Book');
});

// @Route   DELETE /api/books
// @Desc    Delete book
// @access  Private

router.delete('/:id', (req, res) => {
  res.send('Delete a book');
});

module.exports = router;