'use strict';

const addHeaders = {
  'access-control-allow-origin': '*',
  'access-control-expose-headers': '*',
  'x-powered-by': 'nomcdn',
};
const removeHeader = 'Transfer-Encoding';

const responHeader = (req, res, next) => {
  res.header(addHeaders);
  res.removeHeader(removeHeader);
  next();
};

// Disable x-powered-by express
let expressPoweredby = 'x-powered-by';

module.exports = { responHeader, expressPoweredby };
