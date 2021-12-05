'use strict';

const uuid = require('uuid');

module.exports = (req, res, next) => {
  const uuidVersion = 'v4';
  const headerName = 'X-Request-Id';

  const setRequestId = req.headers[headerName.toLowerCase()] || uuid[uuidVersion]();
  res.set('X-NCD-Request-Id', setRequestId);
  next();
};
