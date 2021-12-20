'use strict';

const path = require('path');
const url = require('url');
const https = require('https');
const zlib = require('zlib');
const etag = require('etag');

const config = require('../../config');
const { extensionWhitelist } = require('../middleware/file-extension');
const response = require('../utils/response');
const color = require('../utils/color-log');

module.exports = async (req, res, next) => {
  try {
    // get param from url
    const getUrl = `https://` + req.params.url + req.path;

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

    if (extensionWhitelist.has(extension)) {
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
        const upstreamHeaders = upstreamResponse.headers;

        config.relayResponseHeaders.forEach((name) => {
          let value = upstreamHeaders[name.toLowerCase()];

          if (value) {
            res.set(name, value);
          }
        });

        res.set('Etag', upstreamHeaders['etag'] || etag(getUrl, { weak: true }));
        onResponse(req, res, upstreamResponse);
      });

      proxyReq.on('error', (error) => {
        let message = `NomCDN either was unable to connect to <code><span>${error.hostname}</span></code> or received an invalid response from <code><span>${error.hostname}</span></code><br />Please try your request again in a moment.`;
        return response.errPage(res, `502`, `${message}`);
      });
    } else {
      let message = 'File extension blocked.';
      return response.errPage(res, `403`, `${message}`);
    }

    // Log request from request url
    if (process.env.NODE_ENV !== 'production') {
      const logRequest = proxyUrl + proxyPath;
      console.log(color.kuning, `REQUEST:`, logRequest);
    }
  } catch {
    next();
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

  // Get status code headers
  const upstreamStatus = upstreamResponse.statusCode;

  res.status(upstreamStatus);

  if (upstreamStatus === 200) {
    res.set('Cache-Control', `public, max-age=15778800, immutable`); // 6 bulan
    res.set('Content-Type', upstreamHeaders['content-type']);

    return void streamResponse(req, res, upstreamResponse);
  }

  if (upstreamStatus === 204 || upstreamStatus === 205) {
    return void response.errPage(res, `${upstreamStatus}`);
  }

  if (upstreamStatus >= 300 && upstreamStatus <= 399) {
    res.removeHeader('Location', upstreamHeaders['location']);
    return response.errPage(res, `${upstreamStatus}`, `Your website has a mistake.`);
  }

  if (upstreamStatus === 404) {
    let message = 'Could not find the page on your website.';
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
