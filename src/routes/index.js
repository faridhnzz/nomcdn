'use strict';

const express = require('express');
const cacheControl = require('express-cache-controller');
const routes = express.Router();
//
const indexHome = require('../controllers/home');
const indexUrl = require('../controllers/url-cdn');
const robotsTag = require('../middleware/no-robots');

routes.get('/', indexHome.index);

routes.get('/url', cacheControl({ noCache: true }), indexUrl.index);
routes.use('/url/:url', indexUrl.urlCdn, robotsTag);

module.exports = routes;
