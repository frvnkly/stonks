const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

const userSchema = require('../models/User');
const User = mongoose.model('User', userSchema);
const { compare } = require('../utilities/passwordHasher');

passport.use(new Strategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  (email, password, done) => {
    User
      .findOne({ email })
      .exec(async (err, user) => {
        if (err) return done(err);
        if (!user) return done(null, false);
        const match = await compare(password, user.passwordHash);
        if (!match) return done(null, false);
        return done(null, user);
      });
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    if (err) return done(err);
    done(null, user);
  });
});