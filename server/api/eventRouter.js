var express = require('express');
var Event = require('../models/event');
var moment = require('moment')

var eventRouter = express.Router();

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

// GET route to retrieve existing events based on a given location
// with an end date greater than now

eventRouter.get('/events/:locationid', function(req, res) {

  Event.find({ location: req.params.locationid })
    .where('endDateTime').gt(moment(Date.now()).format())
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

// POST route to create new entries

eventRouter.post('/event/add', function(req, res) {
  var event = req.body;
  console.log(event);

  Event.create(event, function(err, event) {
    if (err) {
      return res.status(500).json({err: err.message});
    }
    res.json({event: event, message: 'Event created!'});
  });
});


// PUT route to update existing entries

eventRouter.put('/event/edit/:id', function(req, res) {
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

eventRouter.delete('/event/:id', function(req, res) {
  Event.findByIdAndRemove(req.params.id, function(err, event) {
    if (err) {
      return res.status(500).json({err: err.message});
    }
    res.json({event: event, message: 'Location removed!'});
  });
});


module.exports = eventRouter;
