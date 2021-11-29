'use strict';

const Home = require('./home');
const urlCdn = require('./url-cdn');

module.exports = {
  // Index and Redirect
  index: Home.index,
  indexUrl: Home.url,

  cdn: require('./cdn'),

  // /:url
  urlProxy: urlCdn.urlCdn,

  // Beta /beta
  urlBeta: require('./url-beta'),
};
