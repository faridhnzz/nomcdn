'use strict';

const express = require('express');
const cacheControl = require('express-cache-controller');
const routes = express.Router();

const controllers = require('../controllers');
const noRobots = require('../middleware/no-robots');

routes.get(controllers.cdn);
routes.get('/', controllers.index);

routes.get('/url', controllers.indexUrl);
routes.use('/url/:url', controllers.urlProxy, noRobots);

// only for develop
routes.use('/beta/:url', controllers.urlBeta);

module.exports = routes;
