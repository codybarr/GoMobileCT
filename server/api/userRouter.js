"use strict";

var express = require('express');
var User = require('../models/user');
var moment = require('moment')

var userRouter = express.Router();

// Constants for role types
const REQUIRE_SUPERADMIN = "Superadmin",
      REQUIRE_ADMIN = "Admin",
      REQUIRE_CLIENT = "Client";

// Authentication Requires
const AuthenticationController = require('../controllers/authentication'),
      passportService = require('../config/passport'),
      passport = require('passport');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });

/*
 * Own protected routes
 * Change Own Password Route
 */
userRouter.put('/user/:id/changepassword', requireAuth, AuthenticationController.confirmOldPassword, function(req, res) {

  const { newPassword } = req.body;
  const id = req.params.id;

  User.findById(id, function(err, user) {
    if (err) return res.status(500).json({ errors: 'User was not found.' });

    user.password = newPassword;

    user.save( function(err) {
      if (err) {
        let errors = [];
        for (var key in Object.keys(err)) {
          errors.push(err[key].message);
        }
        console.log(errors);
        return res.status(500).json({errors: errors});
      }

      res.json({message: 'Password changed successfully!'});
    });
  });
});


/*
 * Superadmin Protected Routes
 */

// GET route to retrive all existing events
// populates the location
userRouter.get('/users', requireAuth, AuthenticationController.roleAuthorization(REQUIRE_SUPERADMIN), function(req, res) {
  User.find({}, function(err, users) {
    if (err) {
      return res.status(500).json({message: err.message});
    } else {
      res.json({users: users});
    }
  });
});

// POST route to add a new user
// TODO: Test: posting new user as Admin (rather than Superadmin),

userRouter.post('/user/add', requireAuth, AuthenticationController.roleAuthorization(REQUIRE_SUPERADMIN), function(req, res) {
  let user = req.body;

  User.findOne({ email: user.email }, function(err, existingUser) {
    if (err) { return res.status(500).json({ errors: err.errors })}

    // If user is not unique, return error
    if (existingUser) {
      return res.status(500).json({ errors: 'That email address is already in use.' });
    }

    User.create(user, function(err, user) {
      if (err) {
        // err = handleError(err);
        return res.status(500).json({errors: err.errors});
      }
      res.json({user: user, message: 'New User Added!'});
    });
  });
});

// DELETE route for deleting a User
userRouter.delete('/user/:id', requireAuth, AuthenticationController.roleAuthorization(REQUIRE_SUPERADMIN), function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if (err) {
      return res.status(500).json({err: err.message});
    }
    res.json({user: user, message: 'User removed!'});
  });
});

// function handleError(err) {
//   var prettyNames = {
//    email: 'Email',
//    password: 'Start Date / Time',
//    role: 'End Date / Time'
//   };
//
//   for (var errName in err.errors) {
//     console.log('Error Name', err.errors[errName].name);
//     switch(err.errors[errName].name) {
//       case 'CastError':
//         if (errName === 'location') {
//          err.errors[errName].message = "Please select a location";
//         } else {
//          err.errors[errName].message = `${prettyNames[errName]} is invalid`;
//         }
//         break;
//     }
//   }
//   return err;
// }

module.exports = userRouter;
