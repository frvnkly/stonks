const mongoose = require('mongoose');
const { Schema } = mongoose;

const User = new Schema({
  name: String,
  email: String,
  passwordHash: String,
});

module.exports = User;