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
    .populate('location', 'name address')
    .exec(function(err, events) {
      if (err) {
        return res.status(500).json({message: err.message});
      } else {
        res.json({events: events});
      }
    });
});

// GET route to retrieve events for the current week
// given a provided Date
eventRouter.get('/events/week/:date', function(req, res) {
  let providedDate = req.params.date;

  Event.find()
    .where('startDateTime').gt(moment(providedDate).startOf('week').format())
    .where('startDateTime').lt(moment(providedDate).endOf('week').format())
    .populate('location', 'name address')
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
      return res.status(500).json({errors: err.errors});
    }
    res.json({event: event, message: 'Event created!'});
  });
});


// PUT route to update existing entries

eventRouter.put('/event/edit/:id', requireAuth, function(req, res) {
  var id = req.params.id;
  var updatedEvent = req.body;

  // {new: true} returns the updated document rather than the original one
  Event.findById(id, function(err, event) {
    if (err) {
      console.log(err);
      return res.status(500).json({errors: err.errors});
    } else {
      // event.merge
      // event.location = updatedEvent.location;
      // event.startDateTime = updatedEvent.startDateTime;
      // event.endDateTime = updatedEvent.endDateTime;
      Object.assign(event, updatedEvent);

      event.save( function(err) {
        if (err) {
          console.error(err);
          err = handleError(err);
          return res.status(500).json({errors: err.errors});
        }

        res.json({event: event, message: 'Event updated!'});
      });
    }
  });
});

// DELETE route to delete an event by ID

eventRouter.delete('/event/:id', requireAuth, function(req, res) {
  Event.findByIdAndRemove(req.params.id, function(err, event) {
    if (err) {
      return res.status(500).json({err: err.message});
    }
    res.json({event: event, message: 'Event removed!'});
  });
});

// DELETE route to delete events with a specified location id
eventRouter.delete('/event', requireAuth, function(req, res) {
  Event.remove({ location: req.body.locationId}, function(err, event) {
    if (err) {
      return res.status(500).json({err: err.message});
    }
    res.json({event: event, message: `Events removed for location ${req.query.locationId}`});
  });
});

/*
 * Helper Functions
 */

function handleError(err) {
  var prettyNames = {
   location: 'Location',
   startDateTime: 'Start Date / Time',
   endDateTime: 'End Date / Time'
  };

  for (var errName in err.errors) {
    console.log('Error Name', err.errors[errName].name);
    switch(err.errors[errName].name) {
      case 'CastError':
        if (errName === 'location') {
         err.errors[errName].message = "Please select a location";
        } else {
         err.errors[errName].message = `${prettyNames[errName]} is invalid`;
        }
        break;
    }
  }
  return err;
}


module.exports = eventRouter;
