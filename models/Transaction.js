const { Schema } = require('mongoose');

const Transaction = new Schema(
  {
    type: String,
    symbol: String,
    shares: Number,
    total: Number,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: { createdAt: 'timestamp' },
  }
);

module.exports = Transaction;