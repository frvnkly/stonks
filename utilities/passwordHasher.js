const bcrypt = require('bcrypt');

const saltRounds = 10;

exports.hash = (password) => {
  return bcrypt.hash(password, saltRounds);
};

exports.compare = (password, hash) => {
  return bcrypt.compare(password, hash);
};