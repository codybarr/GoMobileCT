var mongoose = require('mongoose');

// location.name
// location.location

var locationSchema = new mongoose.Schema({
  name: String,
  latlng: {
    lat: Number,
    lng: Number
  },
  description: String,
  updated: { type: Date, default: Date.now }
});

var model = mongoose.model('Location', locationSchema);

module.exports = model;
