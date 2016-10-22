var express = require('express');
var Event = require('../models/event');
var moment = require('moment')

var eventRouter = express.Router();

// Authentication Requires
const AuthenticationController = require('../controllers/authentication'),
      passportService = require('../config/passport'),
      passport = require('passport');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });


/*
 * Public Routes
 */

// GET route to retrive all existing events
// populates the location
eventRouter.get('/events', function(req, res) {
  Event.find({})
    .populate('location', 'name')
    .exec(function(err, events) {
      if (err) {
        return res.status(500).json({message: err.message});
      } else {
        res.json({events: events});
      }
    });
});

// GET route to retrieve all current or future events

eventRouter.get('/events/current', function(req, res) {

  Event.find()
    .where('endDateTime').gt(moment(Date.now()).format())
    .populate('location', 'id')
    .exec(function(err, events) {
      if (err) {
        return res.status(500).json({message: err.message});
      } else {
        res.json({events: events});
      }
    });
});

// GET route to retrive the event with the corresponding :eventid
eventRouter.get('/event/:eventid', function(req, res) {
  Event.findOne({ _id: req.params.eventid })
    .populate('location', 'name')
    .exec(function(err, event) {
      if (err) {
        return res.status(500).json({message: err.message});
      } else {
        res.json({event: event});
      }
    });
});

/*
 * Protected Routes
 */

// POST route to create new entries

eventRouter.post('/event/add', requireAuth, function(req, res) {
  var event = req.body;

  Event.create(event, function(err, event) {
    if (err) {
      return res.status(500).json({err: err.message});
    }
    res.json({event: event, message: 'Event created!'});
  });
});


// PUT route to update existing entries

eventRouter.put('/event/edit/:id', requireAuth, function(req, res) {
  var id = req.params.id;
  var event = req.body;

  // {new: true} returns the updated document rather than the original one
  Event.findByIdAndUpdate(id, event, {new: true}, function(err, event) {
    if (err) {
      return res.status(500).json({err: err.message});
    }
    res.json({event: event, message: 'Location updated'});
  });
});

// DELETE route to delete events

eventRouter.delete('/event/:id', requireAuth, function(req, res) {
  Event.findByIdAndRemove(req.params.id, function(err, event) {
    if (err) {
      return res.status(500).json({err: err.message});
    }
    res.json({event: event, message: 'Location removed!'});
  });
});


module.exports = eventRouter;
