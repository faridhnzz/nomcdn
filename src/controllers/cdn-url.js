const express = require('express');
const url = require('url');
const request = require('request');
const app = express.Router();

app.get('/:url', (req, res, next) => {
  const urlData = req.protocol + '://' + req.params.url + req.path;
  if (urlData) {
    request({
      url: urlData,
    })
      .on('error', function (err) {
        console.error(err);
      })
      .pipe(res);
  } else {
    return json(res, {
      url: 'Not Found',
    });
  }

  //   Log
  if (process.env.NODE_ENV !== 'production') {
    console.log(`REQUEST:  ${urlData}`);
  }

  //
  // var queryData = url.parse(req.url, true).query;
  // if (queryData.url) {
  //   request({
  //     url: ('http://' || 'https://') + queryData.url,
  //   })
  //     .on('error', function (err) {
  //       console.error(err);
  //     })
  //     .pipe(res);
  // } else {
  //   res.json({ url: 'Not Found' });
  // }

  // Log the request to the public API
  //   if (process.env.NODE_ENV !== 'production') {
  //     console.log(`REQUEST:  ${queryData.url}`);
  //   }
});

module.exports = app;
