const { Schema } = require('mongoose');

const Stock = new Schema({
  symbol: String,
  shares: Number,
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = Stock;