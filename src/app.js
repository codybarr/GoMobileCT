'use strict';

var express = require('express');
var app = express();
var parser = require('body-parser');
// var apiRouter = require('./api/index.js');

// database
// var database = require('./database');
// seed data - gets recreated each time the server is restarted
// require('./seed');

app.use('/', express.static('public'));
app.use(parser.json());

// app.use('/api', apiRouter);

app.listen(3000, function() {
  console.log('Server running on port 3000');
});
