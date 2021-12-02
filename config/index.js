'use strict';
const path = require('path');

module.exports = {
  // Public directory containing static files.
  publicDir: path.join(__dirname, '..', 'view'),

  // Number of milliseconds after which a connection to the upstream proxy will
  // time out if there's no activity on the socket.
  proxyTimeout: 10000,

  // Array of request header names that should be relayed from the user to
  // Url Respone.
  relayRequestHeaders: ['If-Modified-Since', 'If-None-Match', 'User-Agent'],

  // Array of response header names that should be relayed from Url Respone to the
  // user.
  relayResponseHeaders: ['Date', 'Content-Length', 'Location'],
};
