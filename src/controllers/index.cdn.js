'use strict';

const { json } = require('../utils/response');
const { cacheControl } = require('../middleware/cache-control');

// index of /
exports.index = async (req, res) => {
  res.set('cache-control', `public, max-age=60, immutable`);

  const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  return json(res, {
    Maintainer: 'Farid Nizam <farid@nomsad.com>',
    CDN: {
      Endpoint: '/url/[your url]',
      Example: fullUrl + 'url/example.com/example.css',
    },
  });
};
