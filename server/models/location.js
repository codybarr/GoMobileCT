var mongoose = require('mongoose');

// location.name
// location.location

var locationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Name is required'
  },
  address: {
    type: String,
    required: 'Address is required'
  },
  latlng: {
    lat: {
      type: Number,
      required: 'Latitude was not calculated. Did you click search?'
    },
    lng: {
      type: Number,
      required: 'Longitude was not calculated. Did you click search?'
    }
  },
  description: {
    type: String,
    required: 'Description is required'
  }
},
{
  timestamps: true
});

var Location = mongoose.model('Location', locationSchema);

module.exports = Location;
