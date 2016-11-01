'use strict';

const express  = require('express'),
      path     = require('path'),
      app      = express(),
      parser   = require('body-parser'),
      logger   = require('morgan'),
      favicon  = require('serve-favicon'),
      config   = require('./config/main'),
      database = require('./database');

// Router for events, locations, and authentication
const router = require('./router');
// var authRouter = require('./api/authRouter');

require('./config/seed');

app.use(logger('dev')); // Log HTTP requests

// Favicon
app.use(favicon(path.resolve('public', 'favicon.ico')));

// Static Files
app.use(express.static('public'));


// app.use(parser.urlencoded({ extended: false }));
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


// Error handler?
if (app.get('env') === 'development') {

  // app.use(function(err, req, res, next) {
  //   console.error(err.stack);
  //   res.status(500).send('Something broke!');
  // });

  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err
    });
  });
}


// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', (req, res) => {
  res.sendFile(path.resolve('public', 'index.html'));
});

app.listen(config.port, function() {
  console.log(`Server running on port: ${config.port}.`);
});
