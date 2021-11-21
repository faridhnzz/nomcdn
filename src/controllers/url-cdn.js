'use strict';

const request = require('request');
const path = require('path');
const url = require('url');
const https = require('https');
// const { errorJson } = require('../utils/response');
const { extensionWhitelist, extensionBlacklist } = require('../middleware/file-extension');

// index /url
exports.index = async (req, res) => {
  res.redirect('/');
};

// url proxy /url/:url
exports.urlCdn = async (req, res, next) => {
  // get param from url
  const getUrl = 'https' + '://' + req.params.url + req.path;
  // parse url
  const parsedUrl = url.parse(getUrl, true);
  let proxyUrl = parsedUrl.host;
  let proxyPath = parsedUrl.pathname;
  // get file extension
  const extension = path.extname(getUrl).toLowerCase();
  // Blacklist extension
  if (!extensionBlacklist.has(extension)) {
    // Whitelist extension
    if (extensionWhitelist.has(extension)) {
      // proxy
      try {
        request({
          url: `https://` + proxyUrl + proxyPath,
        })
          .on('error', function (err) {
            console.error(err);
            res.json({
              error: `${errno}`,
              code: `NOT FOUND`,
              message: `${err.hostname} url invalid`,
            });
          })
          .pipe(res);
      } catch (error) {
        next();
      }

      // jika extension tidak terdaftar di whitelist
    } else {
      res.status(403).json({
        code: -403,
        message: 'files not allowed',
      });
    }
    // jika extension di blokir
  } else {
    res.status(403).json({
      code: -403,
      message: 'files not allowed',
    });
  }

  // Log request from request url
  if (process.env.NODE_ENV !== 'production') {
    console.log(`REQUEST:  ${getUrl}`);
  }
};
