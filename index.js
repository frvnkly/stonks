const express = require('express');

const next = require('./next');
require('./mongoose');

const app = express();
app.use(express.json());

// authentication routes
require('./routes/auth')(app);

const start = async port => {
  await next(app);
  app.listen(port);
};

const PORT = process.env.PORT || 5000;
start(PORT);