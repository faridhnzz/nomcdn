'use strict';
const path = require('path');

module.exports = {
  // Public directory containing static files.
  publicDir: path.join(__dirname, '../public'),

  // Views directory containing EJS files.
  viewsDir: path.join(__dirname, '../views'),

  // Number of milliseconds after which a connection to the upstream proxy will
  // time out if there's no activity on the socket.
  proxyTimeout: 10000,

  // Array of request header names that should be relayed from the user to
  // Url Respone.
  relayRequestHeaders: ['If-Modified-Since', 'If-None-Match', 'User-Agent'],

  // Array of response header names that should be relayed from Url Respone to the
  // user.
  relayResponseHeaders: ['ETag', 'Date', 'Content-Length', 'Location', 'Link'],

  // Header for static file use electricity
  electricity: {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Expose-Headers': '*',
      'Cache-Control': 'public, max-age=31536000',
      'X-Powered-By': 'NomCDN',
      'X-TimeStamp': Date.now(),
      'Strict-Transport-Security': 'max-age=63072000',
      'X-Content-Type-Options': 'nosniff',
    },
    sass: {
      // Object passed straight to node-sass options
      outputStyle: 'compressed',
      quietDeps: false,
    },
  },
};
