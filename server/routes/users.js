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

// @Route   POST /api/users
// @Desc    Register a user
// @access  Public

router.post(
  '/',
  [
    body('name', 'Name is required').not().isEmpty(),
    body('email', 'Email is required').isEmail(),
    body('password', 'Password is required').isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      user = await new User({
        name,
        email,
        password,
      });

      //Save user in DB
      await user.save();

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
      });

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

      //Object to send in the token
      const payload = {
        user: {
          id: user.id,
        },
      };

      // Sign the token
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token, user });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
