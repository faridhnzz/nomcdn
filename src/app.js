const express = require('express');
const app = express();
const cors = require('cors');
const cloudflareRestoreIP = require('./middleware/cloudflare-restore-ip');

const routes = require('./routes');
const headerRespons = require('./middleware/headerRespons');
const response = require('./utils/response');
const config = require('../config');
const log = require('./middleware/logging');

// view engine setup
app.set('view engine', 'ejs');
app.set('views' + config.viewsDir);

app.use(express.static(config.publicDir, { etag: true, maxAge: '1y' }));
app.use(cors());

app.use(log);

// restoring visitors IP after being proxied through cloudflare.
app.use(cloudflareRestoreIP());
// trust proxy
app.set('trust proxy', 'loopback', true);

// Etag
app.set('etag', true); // true / false

// Don't allow requests for Google Webmaster Central verification files.
app.get('*/google[0-9a-f]{16}.html', (res) => {
  return response.errPage(res, '502');
});

// header respons
app.disable('x-powered-by');
app.use(headerRespons.responHeader);

// routes
app.use(routes);

module.exports = app;
