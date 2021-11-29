'use strict';

const Headers = require('../../config/headers');

module.exports = (req, res, next) => {
  res.setHeader(Headers.noRobot);
  next();
};
