'use strict';

module.exports = (req, res, next) => {
  res.setHeader('x-robots-tag', 'none');
  next();
};
