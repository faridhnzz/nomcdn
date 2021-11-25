const express = require('express');
const app = express();
const routes = require('./routes/index');
const headerRespons = require('./middleware/headerRespons');

// header respons
app.disable(headerRespons.expressPoweredby);
app.use(headerRespons.responHeader);
// routes
app.use(routes);

module.exports = app;
