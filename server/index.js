// main starting point of the application ->

const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
// our app is an instance of express
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');

// db setup ->
// we tell mongoose to go connect to a particular instance of mongodb
mongoose.connect('mongodb://localhost/auth', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// internally, this creates a new db inside mongodb called auth

const connection = mongoose.connection;

connection.on('connected', function () {
  console.log('connected to db');
});

// app setup ->
// stuff about getting our express server running the way we want it to

app.use(morgan('combined'));
// morgan is a logging framework; for logging incoming requests; we'll mostly be using it for debugging
app.use(cors());
// default use of the cors module - accepts any incoming request, coming in from anywhere, can be further configured to limit access
app.use(bodyParser.json({ type: '*/*' }));
// will parse incoming requests into json; no matter what the incoming request type is
// above, two middlewares in express
router(app);

// server setup ->
// about getting our express app to talk to the outside world

const port = process.env.PORT || 3090;
const server = http.createServer(app);
// http is a native node library
server.listen(port);
console.log('Server listening on:', port);
