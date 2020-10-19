const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const VerificationToken = require('../models/VerificationToken');

router.get(`/:token`, [], async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  console.log(req.params.token);
  let vToken = null;
  try {
    // Find a matching token
    await VerificationToken.findOne({ token: req.params.token }, (err, token) => {
      vToken = token;

      if (!token)
        return res.status(400).send({
          type: 'not-verified',
          msg: 'We were unable to find the token',
        });

      // If a token is found, find a matching user
      User.findById(vToken._userId, (err, user) => {
        if (!user) {
          return res
            .status(400)
            .send({ msg: 'We were unable to find a user for this token' });
        }
        if (user.isVerified) {
          return res.status(400).send({
            type: 'already-verified',
            msg: 'This user has already been verified.',
          });
        }

        // Verify and save user
        user.isVerified = true;
        user.save((err) => {
          if (err) {
            return res.status(500).send({ msg: err.message });
          }
          res.redirect('http://localhost:3000/login');
        });
      });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
