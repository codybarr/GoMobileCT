'use strict';

var Location = require('./models/location');

var locations = [
  {name: 'Empire State Building', location: {lat: 40.748441, lng: -73.985664}},
  {name: 'Statue of Liberty', location: {lat: 40.689249, lng: -74.044500}},
  {name: 'Central Park', location: {lat: 40.771133, lng: -73.974187}}
];

// only adds the location if it isn't already found
locations.forEach(function(location, index) {
  Location.find({'name': location.name}, function(err, locations) {
    if (!err && !locations.length) {
      Location.create(location);
      console.log('Location "%s" was created!', location.name);
    }
  });
});
