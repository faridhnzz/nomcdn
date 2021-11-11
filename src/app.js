const express = require('express');
const app = express();
const indexRoutes = require('./routes/index');
const httpHeader = require('./middleware/httpHeader');

// http header
app.disable(httpHeader.xPowered);
app.use(httpHeader.header);
// routes
app.use(indexRoutes);

module.exports = app;
