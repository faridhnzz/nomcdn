'use strict';

const Home = require('./home');

module.exports = {
  index: Home.index,
  indexUrl: Home.url,
  urlProxy: require('./url-cdn'),
};
