'use strict';

const Headers = require('../../config/headers');

const responHeader = (req, res, next) => {
  res.set(Headers.add);
  res.set(Headers.security);
  // res.removeHeader(Headers.rHeaders);
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
