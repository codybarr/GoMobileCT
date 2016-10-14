'use strict';

const express  = require('express'),
      path     = require('path'),
      app      = express(),
      parser   = require('body-parser'),
      logger   = require('morgan'),
      favicon  = require('serve-favicon'),
      config   = require('./config/main'),
      database = require('./database');

const locationRouter = require('./api/locationRouter'),
      eventRouter    = require('./api/eventRouter');

const router = require('./router');
// var authRouter = require('./api/authRouter');

require('./config/seed');

app.use(logger('dev')); // Log HTTP requests

/*
var passport = require('passport');
var flash    = require('connect-flash');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
*/


// Favicon
app.use(favicon(path.resolve('public', 'favicon.ico')));

// Static Files
app.use(express.static('public'));
app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());

// API Routers / Routers
router(app);

// app.us('/api', authRouter);

// Passport stuff
// app.use(cookieParser()); // read cookies (needed for auth)
// app.use(session({ secret: 'mysupersweetawesomesecret' })); // session secret
// app.use(passport.initialize());
// app.use(passport.session()); // persistent login sessions
// app.use(flash()); // use connect-flash for flash messages stored in session


// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', (req, res) => {
  res.sendFile(path.resolve('public', 'index.html'));
});

app.listen(config.port, function() {
  console.log(`Server running on port: ${config.port}.`);
});
