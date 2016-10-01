var express = require('express');
var Location = require('../models/location');

var apiRouter = express.Router();

apiRouter.get('/locations', function(req, res) {
  Location.find({}, function(err, locations) {
    if (err) {
      return res.status(500).json({message: err.message});
    } else {
      res.json({locations: locations});
    }
  });

});

// TODO: Add POST route to create new entries

apiRouter.post('/locations', function(req, res) {
  var location = req.body;
  Location.create(location, function(err, location) {
    if (err) {
      return res.status(500).json({err: err.message});
    }
    res.json({location: location, message: 'Location created!'});
  });
});

// TODO: Add PUT route to update existing entries

/*
apiRouter.put('/todos/:id', function(req, res) {
  var id = req.params.id;
  var todo = req.body;
  debugger;

  if (todo && todo._id !== id) {
    return res.status(500).json({err: "Ids don't match"});
  }
  Todo.findByIdAndUpdate(id, todo, {new: true}, function(err, todo) {
    if (err) {
      return res.status(500).json({err: err.message});
    }
    res.json({todo: todo, message: 'Todo updated'});
  });
});
*/

module.exports = apiRouter;
