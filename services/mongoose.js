const mongoose = require('mongoose');

const mongoUri = 'mongodb://mongodb:27017/stonks';

require('../models/User');
require('../models/Stock');
require('../models/Transaction');

mongoose.connect(
  mongoUri,
  { useNewUrlParser: true }
).then(() => {
  console.log('connected to mongodb');
}).catch(err => {
  console.log(err);
});