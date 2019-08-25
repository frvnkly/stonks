const axios = requre('axios');

const requireLogin = require('../middleware/requireLogin');

const routePrefix = '/api/stocks';

module.exports = app => {
  app.put(
    `${routePrefix}/buy`,
    requireLogin,
    (req, res) => {
      const { symbol, shares, } = req.body;

      res.end();
    }
  );
};