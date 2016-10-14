const locationRoutes           = require('./api/locationRouter'),
      eventRoutes              = require('./api/eventRouter'),
      express                  = require('express'),
      AuthenticationController = require('./controllers/authentication'),
      passportService = require('./config/passport'),
      passport = require('passport');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

// Constants for role types
const REQUIRE_ADMIN = "Admin",
      REQUIRE_CLIENT = "Client";

module.exports = function(app) {
  // Initializing route groups
  const apiRoutes = express.Router(),
        authRoutes = express.Router();

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
  // Auth Routes
  //=========================

  // Registration route
  authRoutes.post('/register', AuthenticationController.register);

  // Login route
  authRoutes.post('/login', requireLogin, AuthenticationController.login);

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
