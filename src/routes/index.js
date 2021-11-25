'use strict';

const express = require('express');
const cacheControl = require('express-cache-controller');
const routes = express.Router();
//
const indexHome = require('../controllers/index.cdn');
const indexUrl = require('../controllers/url.cdn');
const robotsTag = require('../middleware/no-robots');

routes.get('/', indexHome.index);

routes.get('/url', indexUrl.index);
routes.use('/url/:url', indexUrl.urlCdn, robotsTag);
routes.use('/url2/:url', indexUrl.urlCdnV2, robotsTag);

module.exports = routes;
