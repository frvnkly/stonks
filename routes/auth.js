const mongoose = require('mongoose');

const userSchema = require('../models/User');
const User = mongoose.model('User', userSchema);

const routePrefix = '/auth';

// register route inputs validation
const validateRegisterInput = ({name, email, password}) => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const passwordMinLength = 8;

  if (!name) return false;
  if (!emailRegex.test(email)) return false;
  if (password.length < 8) return false;
  return true;
};

module.exports = app => {
  // user account registration route
  app.post(
    `${routePrefix}/register`,
    (req, res) => {
      const { name, email, password } = req.body;

      // check if 
      if (!validateRegisterInput(req.body)) {
        res
          .status(400)
          .send()
          .end();
        return;
      }

      // check if email already in use
      User.findOne({ email })
        .exec((err, user) => {
          if (err || user) {
            const errorCode = err ? 500 : 409;
            res
              .status(errorCode)
              .send()
              .end();
            return;
          }
          
          // save user credentials to database
          const newUser = new User({
            name,
            email,
            password,
          });
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