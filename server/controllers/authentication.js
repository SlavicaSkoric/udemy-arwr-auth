const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}
// first argument - information that we want to encode; object
// sub & iat - conventions of JWT standard
// sub - subject
// iat - issued at time
// JWT - standard
// second argument - the secret that we're going to use to encrypt it

exports.signup = function (req, res, next) {
  // res.send({ success: 'true' });

  // console.log(req.body);

  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res
      .status(422)
      .send({ error: 'You must provide email and password' });
  }

  // see if a user with the given email exists
  User.findOne({ email: email }, function (err, existingUser) {
    if (err) {
      return next(err);
    }

    // if a user with email does exist, return an error
    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }

    // if a user with email does NOT exist, create and save user record
    const user = new User({
      email,
      password,
    });

    user.save(function (err) {
      if (err) {
        return next(err);
      }

      // respond to request indicating the user was created
      // res.json(user);
      // res.json({ success: true });
      res.json({ token: tokenForUser(user) });
    });
  });
};
