const logfmt = require('logfmt');
const dateTime = require('node-datetime');
const { RequestId } = require('../middleware/request-id');

function date() {
  let denet = dateTime.create();
  let formatted = denet.format('Y-m-d H:M:S');
  return formatted;
}

function envLog(req) {
  return {
    time: date(),
    ip: req.headers['x-forwarded-for'] || req.headers['cf-connecting-ip'] || req.socket.remoteAddress,
    method: req.method,
    protocol: req.protocol,
    hostname: req.hostname,
    'request-id': req.headers['x-request-id'] || RequestId,
    baseUrl: req.baseUrl,
    path: req.path,
  };
}

const log = logfmt.requestLogger(envLog);

module.exports = log;
