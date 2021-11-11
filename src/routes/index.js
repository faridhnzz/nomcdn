const express = require('express');
const routes = express.Router();

routes.use('/', require('../controllers/home'));
routes.use('/cdn', require('../controllers/cdn-url'));

module.exports = routes;
