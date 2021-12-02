'use strict';

const express = require('express');
const routes = express.Router();

const controllers = require('../controllers');
const noRobots = require('../middleware/no-robots');
const config = require('../../config');

routes.get('/', controllers.index);

routes.get('/url', controllers.indexUrl);
routes.use('/url/:url', controllers.urlProxy, noRobots);

// 200 OK for monit website
routes.get('/200', (req, res) => {
  res.set('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.status(200).send('200 OK');
});

// PM2 Monitor
routes.get('/pm2', (req, res) => {
  res.sendFile(config.publicDir + '/error/404.html');
});

module.exports = routes;
