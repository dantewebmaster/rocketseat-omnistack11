const express = require('express');
const routes = express.Router();

// Controllers
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

// Validators
const IncidentValidator = require('./validators/IncidentValidator');
const OngValidator = require('./validators/OngValidator');
const ProfileValidator = require('./validators/ProfileValidator');

/**
 * Sessions
 */
routes.post(
  '/sessions',
  SessionController.create,
);

/**
 * Ongs
 */
routes.get(
  '/ongs',
  OngController.index,
);

routes.post(
  '/ongs',
  OngValidator.create(),
  OngController.create,
);

/**
 * Profile
 */
routes.get(
  '/profile',
  ProfileValidator.index(),
  ProfileController.index,
);

/**
 * Incidents
 */
routes.get(
  '/incidents',
  IncidentValidator.index(),
  IncidentController.index,
);

routes.post(
  '/incidents',
  IncidentValidator.create(),
  IncidentController.create,
);

routes.delete(
  '/incidents/:id',
  IncidentValidator.delete(),
  IncidentController.delete,
);

module.exports = routes;
