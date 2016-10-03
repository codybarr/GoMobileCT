var express = require('express');
var Location = require('../models/location');

var locationRouter = express.Router();

// GET route to retrieve existing locations

locationRouter.get('/locations', function(req, res) {
  Location.find({}, function(err, locations) {
    if (err) {
      return res.status(500).json({message: err.message});
    } else {
      res.json({locations: locations});
    }
  });
});

// GET route to retrieve a single location

locationRouter.get('/location/:id', function(req, res) {
  Location.findById(req.params.id, function(err, location) {
    if (err) {
      return res.status(500).json({message: err.message});
    } else {
      res.json({location: location});
    }
  });
});

// POST route to create new entries

locationRouter.post('/location/add', function(req, res) {
  var location = req.body;
  Location.create(location, function(err, location) {
    if (err) {
      return res.status(500).json({err: err.message});
    }
    res.json({location: location, message: 'Location created!'});
  });
});

// PUT route to update existing entries

locationRouter.put('/location/edit/:id', function(req, res) {
  var id = req.params.id;
  var location = req.body;

  // {new: true} returns the updated document rather than the original one
  Location.findByIdAndUpdate(id, location, {new: true}, function(err, location) {
    if (err) {
      return res.status(500).json({err: err.message});
    }
    res.json({location: location, message: 'Location updated'});
  });
});


// DELETE route to delete entries

locationRouter.delete('/location/:id', function(req, res) {
  Location.findByIdAndRemove(req.params.id, function(err, location) {
    if (err) {
      return res.status(500).json({err: err.message});
    }
    res.json({location: location, message: 'Location removed!'});
  });
});

module.exports = locationRouter;
