const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

// our middlewares:
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

// exporting code in a node environment
module.exports = function (app) {
  // adding route handlers to our app
  /*   app.get('/', function (req, res, next) {
    res.send(['waterbottle', 'phone', 'paper']);
  }); */

  app.get('/', requireAuth, function (req, res) {
    res.send({ hi: 'there' });
  });

  app.post('/signin', requireSignin, Authentication.signin);

  app.post('/signup', Authentication.signup);
};

// express app is the brains of our application
// next - mostly for error handling
