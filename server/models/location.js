var mongoose = require('mongoose');

// location.name
// location.location

var locationSchema = new mongoose.Schema({
  name: String,
  address: String,
  latlng: {
    lat: Number,
    lng: Number
  },
  description: String,
  updated: { type: Date, default: Date.now }
});

var Location = mongoose.model('Location', locationSchema);

module.exports = Location;
