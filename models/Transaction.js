const { Schema } = require('mongoose');

const Transaction = new Schema({
  timestamp: Date,
  type: String,
  symbol: String,
  shares: Number,
  total: Number,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = Transaction;