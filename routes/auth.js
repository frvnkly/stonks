const mongoose = require('mongoose');

const userSchema = require('../models/User');
const User = mongoose.model('User', userSchema);

const routePrefix = '/auth';

module.exports = app => {
  // user account registration route
  app.post(
    `${routePrefix}/register`,
    (req, res) => {
      const { email, password } = req.body;

      // check if email already in use
      User.findOne({ email })
        .exec((err, user) => {
          if (err || user) {
            const errorCode = err ? 400 : 409;
            res
              .status(errorCode)
              .send()
              .end();
            return;
          }
          
          // save user credentials to database
          const newUser = new User({ email, password });
          newUser.save()
            .then(() => {
              res
                .status(201)
                .send()
                .end();
              return;
            })
        })
    } 
  );
};