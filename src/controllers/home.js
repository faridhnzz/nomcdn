'use strict';

const { json } = require('../utils/response');

// index of /
exports.index = async (req, res) => {
  res.set('cache-control', `public, max-age=300, immutable`);

  const fullUrl = `${'https'}://` + req.get('host') + req.originalUrl;
  return json(res, {
    Maintainer: 'Farid Nizam <me@farid.cyou>',
    CDN: {
      Endpoint: '/url/[your url not use https]',
      Example: fullUrl + 'url/www.example.com/example.extension',
    },
  });
};

// redirect /url
exports.url = async (req, res) => {
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.redirect(301, '/');
};
