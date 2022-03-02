const User = require('../models/user');

exports.signup = function (req, res, next) {
  // res.send({ success: 'true' });

  // console.log(req.body);

  const email = req.body.email;
  const password = req.body.password;

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
      res.json({ success: true });
    });
  });
};
