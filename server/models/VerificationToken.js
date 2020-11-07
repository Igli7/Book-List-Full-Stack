const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VerificationTokenSchema = new Schema({
  _userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  token: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    expires: '2m',
    default: Date.now,
  },
});

module.exports = mongoose.model('vToken', VerificationTokenSchema);
