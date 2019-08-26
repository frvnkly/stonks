const axios = require('axios');
const mongoose = require('mongoose');

const requireLogin = require('../middleware/requireLogin');
const userSchema = require('../models/User');
const stockSchema = require('../models/Stock');
const User = mongoose.model('User', userSchema);
const Stock = mongoose.model('Stock', stockSchema);

const config = require('../config');
const routePrefix = '/api/stocks';
const apiEndpoint = 'https://www.alphavantage.co/query';

module.exports = app => {
  // purchase stocks route
  app.put(
    `${routePrefix}/buy`,
    requireLogin,
    async (req, res) => {
      const { symbol, shares, } = req.body;

      // get stock data from api
      let apiRes;
      try {
        apiRes = await axios.get(
          apiEndpoint,
          {
            params: {
              function: 'GLOBAL_QUOTE',
              symbol,
              apikey: config.alphaVantageApiKey,
            }
          }
        );
      } catch (err) {
        res.status(503).send().end();
        return;
      }

      // extract current stock price from api response
      const stockPriceData = apiRes.data['Global Quote'];
      const currentPrice = stockPriceData['05. price'];

      // check if user has enough money in balance
      if (user.balance < currentPrice * shares) {
        res.status(403).send().end();
        return;
      }

      // check if user already owns that stock
      // update record if already owns, create new record otherwise
      let stockRecord = await Stock.findOne({ symbol, userId: user.id });
      if (stockRecord) {
        stockRecord.shares += shares;
      } else {
        stockRecord = new Stock({
          symbol,
          shares,
          user: user.id,
        });
      }

      // update user balance
      const userRecord = await User.findById(user.id);
      userRecord.balance = (
        userRecord.balance - (currentPrice * shares)
      ).toFixed(2);

      // save updates to database
      await userRecord.save();
      await stockRecord.save();

      // update user profile attached to session
      req.login(userRecord);

      res.end();
    }
  );
};