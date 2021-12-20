'use strict';

const uuid = require('uuid');

function getRequestId() {
  const uuidVersion = 'v4';
  const Request_Id = uuid[uuidVersion]();
  return Request_Id;
}

const RequestId = getRequestId();

module.exports = { RequestId };
