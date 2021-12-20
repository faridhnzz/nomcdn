'use strict';

// const req = require('express/lib/request');
// const uuid = require('uuid');
// const https = require('https');

// module.exports = {
//   RequestId: { 'X-Request-Id': id },
//   RequestId_Log: id
// }

// /**
// Handles an incoming response from an upstream server, piping it to the client
// or handling errors as appropriate.

// @param {https.ClientRequest} req
//   Express request object.

// @param {https.ServerResponse} res
//   Express response object.
// **/

// function getRequestId(req) {
//   const uuidVersion = 'v4';
//   const headerName = 'X-Request-Id';
//   const RequestId = req.headers[headerName.toLowerCase()] || uuid[uuidVersion]();
//   return RequestId;
// }

// const id = getRequestId();

// Sent RequestId to headers reespone
// const RequestId = { 'X-Request-Id': id };

// Logging
// const RequestId_Log = id;

// console.log(id);

// module.exports = { RequestId, RequestId_Log };

const uuid = require('uuid');

function getRequestId(req, res, next) {
  // options = options || {};
  const uuidVersion = 'v4';
  const headerName = 'X-Request-Id';
  const Request_Id = req.headers[headerName.toLowerCase()] || uuid[uuidVersion]();
  return Request_Id;

  // return function (req, res, next) {
  //   const Request_Id = req.headers[headerName.toLowerCase()] || uuid[uuidVersion]();
  //   return Request_Id;
  // };
}

const id = getRequestId();

// Sent RequestId to headers reespone
const RequestId = { 'X-Request-Id': id };

// Logging
const RequestId_Log = id;

console.log(id);
