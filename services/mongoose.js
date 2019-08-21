const mongoose = require('mongoose');

const mongoUri = 'mongodb://localhost:27017/stonks';

require('../models/User');

mongoose.connect(
  mongoUri,
  { useNewUrlParser: true }
).then(() => {
  console.log('connected to mongodb');
}).catch(err => {
  console.log(err);
});