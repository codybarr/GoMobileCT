const express = require('express');
const authRoutes = express.Router();

const AuthenticationController = require('../controllers/authentication'),
      passportService = require('../config/passport'),
      passport = require('passport');

// Middleware to require login/auth
const requireLogin = passport.authenticate('json', { session: false });

// Login route
authRoutes.post('/login', requireLogin, AuthenticationController.login);

module.exports = authRoutes;
