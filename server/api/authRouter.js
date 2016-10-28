const express = require('express');
const authRoutes = express.Router();

const AuthenticationController = require('../controllers/authentication'),
      passportService = require('../config/passport'),
      passport = require('passport');

// Middleware to require login/auth
// const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('json', { session: false });

// Registration route
// Will have to rewrite this to be user add/update/delete routes
// authRoutes.post('/register', AuthenticationController.register);

// Login route
authRoutes.post('/login', requireLogin, AuthenticationController.login);

module.exports = authRoutes;
