'use strict';

const Home = require('./home');

module.exports = {
  // Index and Redirect
  index: Home.index,
  indexUrl: Home.url,
  cdn: require('./cdn'),
  urlProxy: require('./url-cdn'),
  urlBeta: require('./url-beta'),
};
