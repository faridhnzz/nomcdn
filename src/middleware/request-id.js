'use strict';

const uuid = require('uuid');

module.exports = (req, res, next) => {
  const uuidVersion = 'v4';
  const headerName = 'X-Request-Id';

  const getRequestId = req.headers[headerName.toLowerCase()] || uuid[uuidVersion]();
  const setHeader = ('X-NCD-Request-Id', getRequestId);
  next();
  return setHeader;
};
