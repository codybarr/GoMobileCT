const mongoose = require('mongoose');
const config   = require('./config/main');

// Received a deprecation warning when trying to use populate for event locations:
// (node:58151) DeprecationWarning: Mongoose: mpromise (mongoose's default promise library) is deprecated, plug in your own promise library instead: http://mongoosejs.com/docs/promises.html
// This seems to clear it? Hopefully I did this right
mongoose.Promise = global.Promise;

mongoose.connect(config.database, function(err) {
  if (err) {
    console.log('Failed to connect to mongodb');
  } else {
    console.log('Successfully connected to mongodb');
  }
});
