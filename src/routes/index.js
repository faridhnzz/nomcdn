'use strict';

const express = require('express');
const routes = express.Router();

const controllers = require('../controllers');
const noRobots = require('../middleware/no-robots');
const config = require('../../config');

// routes.use(respone);
// Asset Static
// const assetsPath = config.publicDir;
// const age = '365d';
routes.use('/static', express.static(config.publicDir, { maxAge: '365d', immutable: true }));

routes.get('/', controllers.index);

routes.get('/url', controllers.indexUrl);
routes.use('/url/:url', controllers.urlProxy, noRobots);

// PM2 Monitor
routes.get('/pm2', (req, res) => {
  res.sendFile(config.publicDir + '/index.html');
});

// only for develop
// routes.use('/beta/:url', controllers.urlBeta);

module.exports = routes;
