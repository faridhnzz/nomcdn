'use strict';

const express = require('express');
const routes = express.Router();

const controllers = require('../controllers');
const noRobots = require('../middleware/no-robots');

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
  const message = [{ code: '404', title: 'Not found' }];
  res.set('Cache-Control', 'public, max-age=3600');
  res.status(404).render('error', { message });
});

module.exports = routes;
