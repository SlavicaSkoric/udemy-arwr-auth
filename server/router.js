// exporting code in a node environment
module.exports = function (app) {
  // adding route handlers to our app
  app.get('/', function (req, res, next) {
    res.send(['waterbottle', 'phone', 'paper']);
  });
};

// express app is the brains of our application
// next - mostly for error handling
