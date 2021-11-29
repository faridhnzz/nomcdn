// request proxy
let proxyReq = https.get({
  hostname: proxyUrl,
  path: proxyPath,
  port: 443,
});

proxyReq.on('socket', (socket) => {
  socket.setTimeout(10000);

  socket.on('timeout', () => {
    console.error('Proxy request timed out:', proxyPath);
    proxyReq.abort();
  });
});

proxyReq.on('error', () => {
  res.status(502).json({ staus: error });
});

// req
// try {
//   request({
//     url: urlData,
//   })
//     .on('error', function (err) {
//       console.error(err);
//       res.json({
//         error: `${errno}`,
//         code: `NOT FOUND`,
//         message: `${err.hostname} url invalid`,
//       });
//     })
//     .pipe(res);
// } catch (error) {
//   next();
// }

// proxy
try {
  https
    .get({
      hostname: proxyUrl,
      path: proxyPath,
      port: 443,
    })
    .pipe(res);
} catch (err) {
  next(err);
}

// req

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

//
var callback = function (response) {
  if (response.statusCode === 200) {
    res.writeHead(200, {
      'Content-Type': response.headers['content-type'],
    });
    response.pipe(res);
  } else {
    res.writeHead(response.statusCode);
    res.end();
  }
};

https.request(option, callback);

const proxy = function (r) {
  if (r.statusCode === 200) {
    res.writeHead(200, {
      'Content-Type': r.headers['content-type'],
      Vary: 'Accept-Encoding',
    });
    r.pipe(res);
  } else {
    res.writeHead(r.statusCode);
    res.end();
  }
};

https.get({ hostname: proxyUrl, path: proxyPath, port: 443 }, proxy);

//

proxyReq.on('response', (upstreamResponse) => {
  // Pass certain upstream headers along in the response.
  const upstreamHeaders = upstreamResponse.headers;

  config.relayResponseHeaders.forEach((name) => {
    let value = upstreamHeaders[name.toLowerCase()];

    if (value) {
      res.set(name, value);
    }
  });

  // Get status code Headers
  const upstreamStatus = upstreamResponse.statusCode;

  res.status(upstreamStatus);

  // Respond immediately on 2xx No Content or 3xx.
  if (upstreamStatus === 204 || upstreamStatus === 205 || (upstreamStatus >= 300 && upstreamStatus <= 399)) {
    return void res.end();
  }

  if (upstreamStatus === 200) {
    res.set({
      'Content-Type': `${upstreamHeaders['content-type']}`,
      Vary: 'Accept-Encoding',
    });
    upstreamResponse.pipe(res);
  } else {
    res.writeHead(upstreamStatus);
    res.end();
  }
});
