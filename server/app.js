'use strict';

var express = require('express');
const path = require('path');
var app = express();
var parser = require('body-parser');

var locationRouter = require('./api/locationRouter');
var eventRouter = require('./api/eventRouter');

// database
var database = require('./database');
// seed data
require('./seed');

// Static Files
app.use(express.static('public'));
app.use(parser.json());

// API Routers
app.use('/api', locationRouter);
app.use('/api', eventRouter);

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', function (request, response){
  response.sendFile(path.resolve('public', 'index.html'));
});

app.listen(3000, function() {
  console.log('Server running on port 3000');
});
