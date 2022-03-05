const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// 000 - create local strategy
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, function (
  email,
  password,
  done
) {
  // verify this email and password, call done with the user
  // if it is the correct email and password
  // otherwise, call done with false
  User.findOne({ email: email }, function (err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false);
    }

    // compare passwords - is the supplied `password` equal to user.password?
    user.comparePassword(password, function (err, isMatch) {
      if (err) {
        return done(err);
      }
      if (!isMatch) {
        return done(null, false);
      }

      return done(null, user);
    });
  });
});

// 111 - setup options for jwt strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret,
};

// 222 - create jwt strategy
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
  // see if the user id in the payload exists in our database
  // if it does, call 'done' with that user
  // otherwise, call done without a user object
  User.findById(payload.sub, function (err, user) {
    if (err) {
      return done(err, false);
    }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});
// arguments to the constructor:
// 1 - our options object
// 2 - function to be called whenever a user tries to log in with a jwt, or whenever we need to authenticate a user with a jwt token
// payload - decoded jwt token (sub & iat we created earlier)
// done - callback

// 333 - tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
