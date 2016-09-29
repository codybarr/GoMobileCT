'use strict';

var Location = require('./models/location');

var locations = [
  {name: 'Empire State Building',
    latlng: {lat: 40.748441, lng: -73.985664},
    description: 'Tallest building in the world! But not really...'},
  {name: 'Statue of Liberty',
    latlng: {lat: 40.689249, lng: -74.044500},
    description: 'A very tall lady...with a torch...'},
  {name: 'Central Park',
    latlng: {lat: 40.771133, lng: -73.974187},
    description: 'Largest Park ever! I guess...'}
];

// removes all entries, model was changed recently (location.location to location.latlng)
Location.remove({}, function() {
  console.log('Documents removed.');
});


// only adds the location if it isn't already found
locations.forEach(function(location, index) {
  Location.find({'name': location.name}, function(err, locations) {
    if (!err && !locations.length) {
      Location.create(location);
      console.log('Location "%s" was created!', location.name);
    }
  });
});
