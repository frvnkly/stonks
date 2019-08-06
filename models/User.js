const mongoose = require('mongoose');
const { Schema } = mongoose;

const User = new Schema({
  email: String,
  passwordHash: String,
});

module.exports = User;