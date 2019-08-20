const mongoose = require('mongoose');
const { Schema } = mongoose;

const STARTING_BALANCE = 5000;

const User = new Schema({
  name: String,
  email: String,
  passwordHash: String,
  balance: { type: Number, default: STARTING_BALANCE },
});

module.exports = User;