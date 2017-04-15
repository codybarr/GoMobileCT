'use strict';

const locationRoutes           = require('./api/locationRouter'),
      eventRoutes              = require('./api/eventRouter'),
      authRoutes               = require('./api/authRouter'),
      userRoutes               = require('./api/userRouter'),
      emailRoutes              = require('./api/emailRouter'),
      express                  = require('express');

// Constants for role types
const REQUIRE_SUPERADMIN = "Superadmin",
      REQUIRE_ADMIN = "Admin",
      REQUIRE_CLIENT = "Client";

module.exports = function(app) {
  // Initializing route groups
  const apiRoutes = express.Router();

  //=========================
  // Location Routes
  //=========================
  apiRoutes.use(locationRoutes);
  // TODO: Refactor locationRouter to be like controllers/authentication.js so it just exports a bunch of functions, then import those routes here with protection

  //=========================
  // Event Routes
  //=========================
  apiRoutes.use(eventRoutes);

  //=========================
  // User Routes
  //=========================
  apiRoutes.use(userRoutes);

  //=========================
  // Email Routes
  //=========================
  apiRoutes.use(emailRoutes);

  //=========================
  // Auth Routes
  //=========================

  // Set auth routes as subgroup/middleware to apiRoutes
  apiRoutes.use('/auth', authRoutes);

  /*
  // Password reset request route (generate/send token)
  authRoutes.post('/forgot-password', AuthenticationController.forgotPassword);

  authRoutes.post('/reset-password/:token', AuthenticationController.verifyToken);
  */

  // Set URL for API group routes;
  app.use('/api', apiRoutes);
};
