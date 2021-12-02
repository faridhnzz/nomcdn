'use strict';

const Headers = require('../../config/headers');
// const respon = require('./respone-time');

const responHeader = (req, res, next) => {
  res.set('X-NCD-Request-Id', req.headers['x-request-id']);
  res.set(Headers.add);
  res.set(Headers.security);

  let headers = {};
  Headers.remove.forEach((header) => {
    let value = res.removeHeader(header);

    if (value) {
      headers[header] = value;
    }
  });

  next();
};

// Disable x-powered-by express
let expressPoweredby = Headers.disablePowered;

module.exports = { responHeader, expressPoweredby };
