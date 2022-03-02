const Authentication = require('./controllers/authentication');

// exporting code in a node environment
module.exports = function (app) {
  // adding route handlers to our app
  /*   app.get('/', function (req, res, next) {
    res.send(['waterbottle', 'phone', 'paper']);
  }); */

  app.post('/signup', Authentication.signup);
};

// express app is the brains of our application
// next - mostly for error handling
