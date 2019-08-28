const mongoose = require('mongoose');

const { mongodbUri } = require('../config');

require('../models/User');
require('../models/Stock');
require('../models/Transaction');

mongoose.connect(
  mongodbUri,
  { useNewUrlParser: true }
).then(() => {
  console.log('connected to mongodb');
}).catch(err => {
  console.log(err);
});