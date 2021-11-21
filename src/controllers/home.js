'use strict';

const { json } = require('../utils/response');
const { cacheControl } = require('../middleware/cache-control');

exports.index = async (req, res) => {
  // cache-control
  res.set('cache-control', `public, max-age=60, immutable`);

  const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  return json(res, {
    maintainer: 'Farid Nizam <farid@nomsad.com>',
    cdn: {
      Endpoint: '/url/[your url]',
      Example: fullUrl + 'url/example.com/example.css',
    },
  });
  //
  res.json;
};
