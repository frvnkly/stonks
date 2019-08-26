const axios = require('axios');
const mongoose = require('mongoose');

const requireLogin = require('../middleware/requireLogin');
const userSchema = require('../models/User');
const stockSchema = require('../models/Stock');
const transactionSchema = require('../models/Transaction');
const User = mongoose.model('User', userSchema);
const Stock = mongoose.model('Stock', stockSchema);
const Transaction = mongoose.model('Transaction', transactionSchema);

const config = require('../config');
const routePrefix = '/api/stocks';
const apiEndpoint = 'https://www.alphavantage.co/query';

module.exports = app => {
  // purchase stocks route
  app.put(
    `${routePrefix}/buy`,
    requireLogin,
    async (req, res) => {
      const shares = Number(req.body.shares);
      const symbol = req.body.symbol.toUpperCase();
      const user = req.user;

      // check if shares value is an integer
      if (!Number.isInteger(shares)) {
        console.log('shares');
        res
          .status(400)
          .send({ error: 'Number of shares should be an integer.'})
          .end();
        return;
      }

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

      // check if ticker symbol is valid
      if (apiRes['Error Message']) {
        res.status(400).send({ error: 'Not a valid ticker symbol.' }).end();
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
      let stockRecord = await Stock.findOne({ symbol, user: user.id });
      if (stockRecord) {
        stockRecord.shares += shares;
      } else {
        stockRecord = new Stock({
          symbol,
          shares,
          user: user.id,
        });
      }

      // create new transaction record
      const transactionRecord = new Transaction({
        type: 'buy',
        symbol,
        shares,
        total: (currentPrice * shares).toFixed(2),
        user: user.id,
      });

      // update user balance
      const userRecord = await User.findById(user.id);
      userRecord.balance = (
        userRecord.balance - (currentPrice * shares)
      ).toFixed(2);

      // save updates to database
      await stockRecord.save();
      await userRecord.save();
      await transactionRecord.save();

      res.end();
    }
  );

  // retrieve portfolio route
  app.get(
    `${routePrefix}/portfolio`,
    requireLogin,
    async (req, res) => {
      const user = req.user;

      // retrieve user's stocks from db
      let stocks;
      try {
        stocks = await Stock.find(
          { user: user.id },
          null,
          { sort: { symbol: 1 } },
        ).lean();
      } catch (err) {
        res.status(503).send().end();
        return;
      }
      
      // look up current prices for stocks
      for (let stock of stocks) {
        try {
          const apiRes = await axios.get(
            `${apiEndpoint}`,
            {
              params: {
                function: 'GLOBAL_QUOTE',
                symbol: stock.symbol,
                apikey: config.alphaVantageApiKey,
              }
            }
          );
          if (apiRes.data['Global Quote']) {
            const priceData = apiRes.data['Global Quote'];
            stock.price = priceData['05. price'];
            stock.open = priceData['02. open'];
            stock.latestTradeDay = priceData['07. latest trading day'];
          }
        } catch (err) {
          res.status(503).send().end();
        }
      }

      // calculate portfolio value
      const portfolioValue = stocks.reduce((acc, curr) => {
        return acc + Number(curr.price);
      }, 0);

      res.send({
        balance: user.balance,
        portfolio: portfolioValue,
        stocks
      }).end();

      return;
    }
  );
};