var express = require('express');
var Event = require('../models/event');

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
    .where('endDateTime').gt(Date.now())
    .exec(function(err, events) {
      if (err) {
        return res.status(500).json({message: err.message});
      } else {
        res.json({events: events});
      }
    });
});

//
//
// // GET route to retrieve a single location
//
// locationRouter.get('/location/:id', function(req, res) {
//   Location.findById(req.params.id, function(err, location) {
//     if (err) {
//       return res.status(500).json({message: err.message});
//     } else {
//       res.json({location: location});
//     }
//   });
// });
//

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

//
// // PUT route to update existing entries
//
// locationRouter.put('/location/edit/:id', function(req, res) {
//   var id = req.params.id;
//   var location = req.body;
//
//   // {new: true} returns the updated document rather than the original one
//   Location.findByIdAndUpdate(id, location, {new: true}, function(err, location) {
//     if (err) {
//       return res.status(500).json({err: err.message});
//     }
//     res.json({location: location, message: 'Location updated'});
//   });
// });
//
//
// // DELETE route to delete entries
//
// locationRouter.delete('/location/:id', function(req, res) {
//   Location.findByIdAndRemove(req.params.id, function(err, location) {
//     if (err) {
//       return res.status(500).json({err: err.message});
//     }
//     res.json({location: location, message: 'Location removed!'});
//   });
// });
//

module.exports = eventRouter;
