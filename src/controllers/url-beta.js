'use strict';

const path = require('path');
const url = require('url');
const https = require('https');
const zlib = require('zlib');

const config = require('../../config/index');
const { extensionWhitelist, extensionBlacklist } = require('../middleware/file-extension');
const { error403, error502 } = require('../utils/response');
const color = require('../utils/color-log');

module.exports = async (req, res, next) => {
  try {
    // get param from url
    const getUrl = `${req.secure}://` + req.params.url + req.path;

    // parse url
    const parsedUrl = url.parse(getUrl, true);
    let proxyUrl = parsedUrl.host;
    let proxyPath = parsedUrl.pathname;

    // Headers Respone
    let headers = {};

    config.relayRequestHeaders.forEach((header) => {
      let value = req.header(header);

      if (value) {
        headers[header] = value;
      }
    });

    // headers['accept-encoding'] = 'gzip, deflate, br';
    headers.connection = 'keep-alive';

    // get file extension
    const extension = path.extname(getUrl).toLowerCase();

    if (!extensionBlacklist.has(extension)) {
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
          onResponse(req, res, upstreamResponse);
        });

        proxyReq.on('error', (error) => {
          return error502(res, `NomCDN either was unable to connect to '${error.hostname}' or received an invalid response from '${error.hostname}'. Please try your request again in a moment.`);
        });

        // jika extension file tidak terdaftar di whitelist
      } else {
        return error403(res);
      }
      // jika extension file di blokir
    } else {
      return error403(res);
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

@param {http.ClientRequest} req
  Express request object.

@param {http.ServerResponse} res
  Express response object.

@param {https.IncomingMessage} upstreamResponse
  Incoming response from the upstream server.
**/

function onResponse(req, res, upstreamResponse) {
  // Get respone headers
  const upstreamHeaders = upstreamResponse.headers;

  config.relayResponseHeaders.forEach((name) => {
    let value = upstreamHeaders[name.toLowerCase()];

    if (value) {
      res.set(name, value);
    }
  });

  // Get status code headers
  const upstreamStatus = upstreamResponse.statusCode;

  res.status(upstreamStatus);

  // Respond immediately on 2xx No Content or 3xx.
  if (upstreamStatus === 204 || upstreamStatus === 205 || (upstreamStatus >= 300 && upstreamStatus <= 399)) {
    return void res.end();
  }

  // Meneruskan respons 200 OK
  if (upstreamStatus === 200) {
    res.set('Cache-Control', 'max-age=15778800, immutable'); // 6 bulan

    res.set('Content-Type', upstreamHeaders['content-type']);

    return void streamResponse(req, res, upstreamResponse);
  }

  // Meneruskan respons 4xx dan 5xx tanpa mengubah Content-Type.
  if (upstreamStatus >= 400 && upstreamStatus <= 599) {
    res.set({
      'Cache-Control': 'max-age=300', // 5 menit
      'NomCDN-Upstream-Error': 'null',
    });

    if (upstreamHeaders['content-type']) {
      res.set('Content-Type', upstreamHeaders['content-type']);
    }

    return void streamResponse(req, res, upstreamResponse);
  }

  res.status(502);
}

function streamResponse(req, res, upstreamResponse) {
  const upstreamHeaders = upstreamResponse.headers;
  // Decompress the response if necessary.
  const encoding = upstreamHeaders['content-encoding'];

  if (encoding === 'gzip' || encoding === 'deflate' || encoding === 'br') {
    upstreamResponse = upstreamResponse.pipe(zlib.createUnzip());
  }

  res.set('Vary', 'Accept-Encoding');

  upstreamResponse.pipe(res);
}
