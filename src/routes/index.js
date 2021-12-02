'use strict';

const express = require('express');
const routes = express.Router();

const controllers = require('../controllers');
const noRobots = require('../middleware/no-robots');
const config = require('../../config');

routes.get('/', controllers.index);

routes.get('/url', controllers.indexUrl);
routes.use('/url/:url', controllers.urlProxy, noRobots);

// PM2 Monitor
routes.get('/pm2', (req, res) => {
  res.sendFile(config.publicDir + '/error/404.html');
});

module.exports = routes;
