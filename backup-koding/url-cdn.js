'use strict';

const request = require('request');
const path = require('path');
const url = require('url');
const https = require('https');
const { error403, error502 } = require('../utils/response');
const { extensionWhitelist, extensionBlacklist } = require('../middleware/file-extension');

// index /url
exports.index = async (req, res) => {
  res.redirect('/');
};

// url proxy /url/:url
exports.urlCdn = async (req, res, next) => {
  // get param from url
  const getUrl = 'https://' + req.params.url + req.path;
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
      // req proxy
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
      return error403(res, 'files not allowed');
    }
    // jika extension di blokir
  } else {
    return error403(res, 'files not allowed');
  }

  // Log request from request url
  if (process.env.NODE_ENV !== 'production') {
    console.log(`REQUEST:  ${getUrl}`);
  }
};
//
//
// v2 v2 v2 v2 v2 v2 v2 v2
//
//

// exports.urlCdnV2 = async (req, res, next) => {
//   try {
//     // get param from url
//     const getUrl = 'https://' + req.params.url + req.path;
//     // parse url
//     const parsedUrl = url.parse(getUrl, true);
//     let proxyUrl = parsedUrl.host;
//     let proxyPath = parsedUrl.pathname;
//     // get file extension
//     const extension = path.extname(getUrl).toLowerCase();
//     // extension
//     if (!extensionBlacklist.has(extension)) {
//       if (extensionWhitelist.has(extension)) {
//         // req proxy
//         let proxyReq = https.get({
//           hostname: proxyUrl,
//           path: proxyPath,
//           port: 443,
//         });

//         proxyReq.on('response', (r) => {
//           if (r.statusCode === 200) {
//             res.writeHead(200, {
//               'Content-Type': r.headers['content-type'],
//               Vary: 'Accept-Encoding',
//             });
//             r.pipe(res);
//           } else {
//             res.writeHead(r.statusCode);
//             res.end();
//           }
//         });

//         proxyReq.on('error', (error) => {
//           return error502(res, `NomCDN either was unable to connect to '${error.hostname}' or received an invalid response from '${error.hostname}'. Please try your request again in a moment.`);
//         });

//         // jika extension file tidak terdaftar di whitelist
//       } else {
//         return error403(res);
//       }
//       // jika extension file di blokir
//     } else {
//       return error403(res);
//     }

//     // Log request from request url
//     if (process.env.NODE_ENV !== 'production') {
//       console.log(`REQUEST:  ${getUrl}`);
//     }
//   } catch {
//     next();
//   }
// };