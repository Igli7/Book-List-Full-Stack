const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const VerificationToken = require('../models/VerificationToken');

// @Route   POST /api/resend
// @Desc    Resend email
// @access  Public

router.post('/', async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {  email } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .send({ msg: 'We were unable to find a user with that email.' });
    }
    if (user.isVerified) {
      return res
        .status(400)
        .send({ msg: 'This account has already been verified' });
    }

    // Create Verification Token
    let vToken = new VerificationToken({
      _userId: user.id,
      token: crypto.randomBytes(16).toString('hex'),
    });

    // Save The token
    await vToken.save((err) => {
      if (err) {
        return res.status(500).send({ msg: err.message });
      }

      // Send the Email

      let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: config.get('email'),
          pass: config.get('password'),
        },
      });

      let url = `https://book-list-full-stack.herokuapp.com/api/confirmation/${vToken.token}`;

      let mailOptions = {
        from: config.get('email'),
        to: user.email,
        subject: 'Account Verification Token',
        html: `Please Veriy your account by clicking the link: <a href='${url}' target="_blank"> ${url} </a>`,
      };
      transporter.sendMail(mailOptions, (err) => {
        if (err) {
          return res.status(500).send({ msg: err.message });
        }
        res
          .status(200)
          .send(`A verification email has been sent to ${user.email}`);
      });

      res.json(`A verification email has been sent to ${user.email}`);
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
