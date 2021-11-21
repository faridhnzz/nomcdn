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
