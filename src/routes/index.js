'use strict';

const express = require('express');
const routes = express.Router();

const controllers = require('../controllers');
const noRobots = require('../middleware/no-robots');
const respone = require('../utils/response');

routes.get('/', controllers.index);

routes.get('/url', controllers.indexUrl);
routes.use('/url/:url', controllers.urlProxy, noRobots);

// 200 OK for monit website
routes.get('/200', (req, res) => {
  res.set('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.status(200).send('OK');
});

// 404 page
routes.get('*', (req, res) => {
  return respone.errPage(res, '404');
});

module.exports = routes;
