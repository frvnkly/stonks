const { Schema } = require('mongoose');

const STARTING_BALANCE = 5000.00;

const User = new Schema({
  name: String,
  email: String,
  passwordHash: String,
  balance: { type: Number, default: STARTING_BALANCE },
});

module.exports = User;