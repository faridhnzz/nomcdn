const express = require('express');
const app = express();

const routes = require('./routes/index');
const headerRespons = require('./middleware/headerRespons');
const response = require('./utils/response');

app.set('trust proxy', 'loopback', true);
// Etag
app.set('etag', true); // true / false
app.set('etag', 'weak');
// Don't allow requests for Google Webmaster Central verification files.
app.get('*/google[0-9a-f]{16}.html', response.error403);
// header respons
app.disable(headerRespons.expressPoweredby);
app.use(headerRespons.responHeader);
// routes
app.use(routes);

module.exports = app;
