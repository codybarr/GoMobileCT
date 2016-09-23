var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/gomobilect', function(err) {
  if (err) {
    console.log('Failed to connect to mongodb');
  } else {
    console.log('Successfully connected to mongodb');
  }
});
