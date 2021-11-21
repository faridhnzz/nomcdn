const express = require('express');
const app = express();
const routes = require('./routes/index');
const headerRespons = require('./middleware/headerRespons');
const robotsTag = require('./middleware/no-robots');

// header respons
// app.enable('trust proxy');
app.disable(headerRespons.expressPoweredby);
app.use(headerRespons.responHeader);
// routes
app.use(routes);

module.exports = app;
