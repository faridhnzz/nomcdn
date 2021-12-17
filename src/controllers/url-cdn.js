'use strict';

const path = require('path');
const url = require('url');
const https = require('https');
const zlib = require('zlib');

const config = require('../../config');
const { extensionWhitelist } = require('../middleware/file-extension');
const response = require('../utils/response');
const color = require('../utils/color-log');

module.exports = async (req, res, next) => {
  try {
    // get param from url
    const getUrl = `${req.secure}://` + req.params.url + req.path;

    // parse url
    const parsedUrl = url.parse(getUrl, true);
    let proxyUrl = parsedUrl.host;
    let proxyPath = parsedUrl.pathname;

    // Headers request
    let headers = {};

    config.relayRequestHeaders.forEach((header) => {
      let value = req.header(header);

      if (value) {
        headers[header] = value;
      }
    });

    headers.connection = 'keep-alive';

    // get file extension
    const extension = path.extname(getUrl).toLowerCase();

    // if (!extensionBlacklist.has(extension))
    if (extensionWhitelist.has(extension)) {
      // if (extensionWhitelist.has(extension)) {
      // req proxy
      let proxyReq = https.get({
        hostname: proxyUrl,
        path: proxyPath,
        port: 443,
        headers: headers,
      });

      proxyReq.on('socket', (socket) => {
        socket.setTimeout(config.proxyTimeout);

        socket.on('timeout', () => {
          console.error(color.merah, 'Proxy request timed out:', proxyPath);
          proxyReq.abort();
        });
      });

      proxyReq.on('response', (upstreamResponse) => {
        onResponse(req, res, upstreamResponse);
      });

      proxyReq.on('error', (error) => {
        let message = `NomCDN either was unable to connect to <code><span>${error.hostname}</span></code> or received an invalid response from <code><span>${error.hostname}</span></code><br />Please try your request again in a moment.`;
        return response.errPage(res, `502`, `${message}`);
      });

      // jika extension file tidak terdaftar di whitelist
      // } else {
      //   return error403(res);
      // }
      // jika extension file di blokir
    } else {
      let message = 'File extension blocked.';
      return response.errPage(res, `403`, `${message}`);
    }

    // Log request from request url
    if (process.env.NODE_ENV !== 'production') {
      const logRequest = proxyUrl + proxyPath;
      console.log(color.kuning, `REQUEST:`, logRequest);
    }
  } catch (error) {
    next(error);
  }
};

// -- Private Functions --------------------------------------------------------

/**
Handles an incoming response from an upstream server, piping it to the client
or handling errors as appropriate.

@param {https.ClientRequest} req
  Express request object.

@param {https.ServerResponse} res
  Express response object.

@param {https.IncomingMessage} upstreamResponse
  Incoming response from the upstream server.
**/

function onResponse(req, res, upstreamResponse) {
  // Get response headers
  const upstreamHeaders = upstreamResponse.headers;

  config.relayResponseHeaders.forEach((name) => {
    let value = upstreamHeaders[name.toLowerCase()];

    if (value) {
      res.set(name, value);
    }
  });

  // res.set('ETag', upstreamHeaders['etag'] || upstreamHeaders['eagleid']);

  // Get status code headers
  const upstreamStatus = upstreamResponse.statusCode;

  res.status(upstreamStatus);

  // Meneruskan respons 200 OK
  if (upstreamStatus === 200) {
    res.set('Cache-Control', `public, max-age=15778800, immutable`); // 6 bulan
    res.set('Content-Type', upstreamHeaders['content-type']);

    return void streamResponse(req, res, upstreamResponse);
  }

  if (upstreamStatus === 204 || upstreamStatus === 205) {
    return void response.errPage(res, `${upstreamStatus}`);
  }

  if (upstreamStatus >= 300 && upstreamStatus <= 399) {
    return;
  }

  if (upstreamStatus === 404) {
    let message = 'Could not find the page.';
    return void response.errPage(res, `${upstreamStatus}`, `${message}`);
  }

  return void response.errPage(res, `502`);
}

function streamResponse(req, res, upstreamResponse) {
  const upstreamHeaders = upstreamResponse.headers;
  // Decompress the response if necessary.
  const encoding = upstreamHeaders['content-encoding'];

  if (encoding === 'gzip' || encoding === 'deflate' || encoding === 'br') {
    upstreamResponse = upstreamResponse.pipe(zlib.createUnzip());
  }

  if (upstreamResponse) {
    res.set('Vary', 'Accept-Encoding');
    upstreamResponse.pipe(res);
  }
}
