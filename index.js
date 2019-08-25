const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');

const config = require('./config');
const next = require('./next');
require('./services/mongoose');
require('./services/passport');

const app = express();

app.use(express.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    keys: [config.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

// authentication routes
require('./routes/auth')(app);

const start = async port => {
  await next(app);
  app.listen(port);
};

const PORT = process.env.PORT || 5000;
start(PORT);