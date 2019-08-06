const mongoose = require('mongoose');

const mongoUri = 'mongodb://localhost:27017';

require('./models/User');

mongoose.connect(mongoUri);