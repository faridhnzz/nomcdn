'use strict';
const responseCode = require('../../config/response-code');

function errPage(res, status, msg) {
  let statusCode = status;
  const messageCode = responseCode[statusCode];
  const message = [{ code: `${statusCode}`, title: `${messageCode}`, message: `${msg || ''}` }];
  res.set('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.status(statusCode).render('error-page', { message });
  return errPage;
}

const json = (res, data) => {
  res.json({
    status: true,
    data,
  });
};

module.exports = { errPage, json };
