'use strict';

const Headers = require('../../config/headers');
const { RequestId } = require('./request-id');

const responHeader = (req, res, next) => {
  res.set(Headers.add);
  res.set(Headers.security);
  res.set('X-Request-Id', req.headers['x-request-id'] || RequestId);

  let headers = {};
  Headers.remove.forEach((header) => {
    let value = res.removeHeader(header);

    if (value) {
      headers[header] = value;
    }
  });

  next();
};

module.exports = { responHeader };
