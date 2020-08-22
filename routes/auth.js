const express = require('express');

const router = express.Router();

// @Route   GET /api/auth
// @Desc    Get logged in User
// @access  Private

router.get('/', (req, res) => {
  res.send('Get logged in user');
});

// @Route   POST /api/auth
// @Desc    Auth user and get Token
// @access  Public

router.post('/', (req, res) => {
  res.send('Log in a User');
});

module.exports = router;
