const express = require('express');
const app = express();
const cors = require('cors');
const electricity = require('electricity');

const routes = require('./routes/index');
const headerRespons = require('./middleware/headerRespons');
const response = require('./utils/response');
const config = require('../config');

// view engine setup
app.set('view engine', 'ejs');
app.set('views' + config.viewsDir);

app.use(electricity.static(config.publicDir, config.electricity));
app.use(cors());

// trust proxy
app.set('trust proxy', 'loopback', true);

// Etag
app.set('etag', true); // true / false
app.set('etag', 'weak');

// Don't allow requests for Google Webmaster Central verification files.
app.get('*/google[0-9a-f]{16}.html', response.error403);

// header respons
app.disable('x-powered-by');
app.use(headerRespons.responHeader);

// routes
app.use(routes);

module.exports = app;
