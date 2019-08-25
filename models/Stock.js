const { Schema } = require('mongoose');

const Stock = new Schema({
  symbol: String,
  shares: Number,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = Stock;