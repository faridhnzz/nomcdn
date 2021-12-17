'use strict';

const Headers = require('../../config/headers');
const { RequestId } = require('../middleware/request-id');

const responHeader = (req, res, next) => {
  res.set(Headers.add);
  res.set(Headers.security);
  res.set(RequestId);

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
