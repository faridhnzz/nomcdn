const express = require('express');
const url = require('url');
const request = require('request');
const app = express.Router();

app.get('/', (req, res, next) => {
  var queryData = url.parse(req.url, true).query;
  if (queryData.url) {
    request({
      url: ('http://' || 'https://') + queryData.url,
    })
      .on('error', function (err) {
        console.error(err);
      })
      .pipe(res);
  } else {
    res.json({ url: 'Not Found' });
  }

  // Log the request to the public API
  if (process.env.NODE_ENV !== 'production') {
    console.log(`REQUEST:  ${queryData.url}`);
  }
});

module.exports = app;
