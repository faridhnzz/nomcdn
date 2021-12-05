'use strict';

module.exports = (req, res, next) => {
  res.set('X-Robots-Tag', 'none');
  next();
};
