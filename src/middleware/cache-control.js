// 'use strict';

// function cacheControl(option) {
//   option = option || {};

//   return function (req, res, next) {
//     res.set('Cache-Control', `private, no-cache, no-store, must-revalidate`);
//     console.log('Cache-Control', `${cache}`);
//   };
// }

// module.exports = { cacheControl };

// //

// module.exports = function (options) {
//   options = options || {};
//   options.uuidVersion = options.uuidVersion || 'v4';
//   options.setHeader = options.setHeader === undefined || !!options.setHeader;
//   options.headerName = options.headerName || 'Cache-Control';
//   options.attributeName = options.attributeName || 'id';

//   return function (req, res, next) {
//     req[options.attributeName] = req.headers[options.headerName.toLowerCase()] || uuid[options.uuidVersion](options, options.buffer, options.offset);
//     if (options.setHeader) {
//       res.setHeader(options.headerName, req[options.attributeName]);
//     }
//     next();
//   };
// };
