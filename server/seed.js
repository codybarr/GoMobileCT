'use strict';

var Location = require('./models/location');

var locations = [
  {name: 'Carolyn\'s Place',
    address: '137 Grandview Ave, Waterbury, CT 06708',
    latlng: {lat: 41.5019391, lng: -73.03706460000001},
    description: `Carolyn's Place Pregnancy Care Center is a ministry committed to empowering individuals, through education, comfort and assistance, to make life choices related to their sexuality and child-bearing, consistent with the sanctity of human life.`},
  {name: 'Putnam Library',
    address: '225 Kennedy Drive, Putnam, CT 06260',
    latlng: {lat: 41.90460119999999, lng: -71.86899169999998},
    description: `The Putnam Public Library serves the needs of the community by providing free access to a diversity of ideas, information and experiences with the goal of promoting the love of reading, the joy of lifelong learning and engagement with the arts, sciences and humanities.`},
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
