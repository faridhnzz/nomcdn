'use strict';

const req = require('express/lib/request');
const uuid = require('uuid');

function getRequestId(options) {
  options = options || {};
  const uuidVersion = 'v4';
  const headerName = 'X-Request-Id';
  const RequestId = req.header[headerName.toLowerCase()] || uuid[uuidVersion](options, options.buffer, options.offset);
  return RequestId;
}

// set headers respone
function setHeadersRequestId() {
  const headers = { 'X-NCD-Request-Id': getRequestId() };
  return headers;
}

// Kirim headers ke headersRespone.js
const RequestId = setHeadersRequestId();

console.log(RequestId);
