var express = require('express');
var Location = require('../models/location');

var locationRouter = express.Router();

// Authentication Requires
const AuthenticationController = require('../controllers/authentication'),
      passportService = require('../config/passport'),
      passport = require('passport');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });


/*
 * Public Routes
 */

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

// GET route to retrieve all location names and IDs only
// TODO: figure out a way to enable the standard location GET route to digest
// this somehow, using params or adding options to the response body

locationRouter.get('/locations/names', function(req, res) {
  Location.find({})
    .select('_id name')
    .exec(function(err, locations) {
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

/*
 * Protected Routes
 */

// POST route to add new entries

locationRouter.post('/location/add', requireAuth, function(req, res) {
  var location = req.body;
  Location.create(location, function(err, location) {
    if (err) {
      return res.status(500).json({errors: err.errors});
    }
    res.json({location: location, message: 'Location created!'});
  });
});

// PUT route to update existing entries

locationRouter.put('/location/edit/:id', requireAuth, function(req, res) {
  var id = req.params.id;
  var location = req.body;

  // {new: true} returns the updated document rather than the original one
  Location.findByIdAndUpdate(id, location, {new: true, runValidators: true}, function(err, location) {
    if (err) {
      return res.status(500).json({errors: err.errors});
    }
    res.json({location: location, message: 'Location updated'});
  });
});


// DELETE route to delete entries
// TODO: Need to also delete all events with the location that's going to be deleted.

locationRouter.delete('/location/:id', requireAuth, function(req, res) {
  Location.findByIdAndRemove(req.params.id, function(err, location) {
    if (err) {
      return res.status(500).json({err: err.message});
    }
    res.json({location: location, message: 'Location removed!'});
  });
});

module.exports = locationRouter;
