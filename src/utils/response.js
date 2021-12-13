('use strict');

const json = (res, data) => {
  res.json({
    status: true,
    data,
  });
};

const error500 = (res, error, status = 500) => {
  res.status(status).json({
    status: false,
    code: `-${status}`,
    error: `Internal Server Error`,
    message: `${error}`,
  });
};

const error502 = (res, error, status = 502) => {
  const message = [
    {
      code: status,
      title: 'Bad Gateway',
      message: `NomCDN either was unable to connect to <code><span>${error}</span></code> or received an invalid response from <code><span>${error}</span></code><br />Please try your request again in a moment.`,
    },
  ];
  res.set('Cache-Control', 'private, no-cache');
  res.status(status).render('error', { message });
};

const error403 = (res, error, status = 403) => {
  const message = [{ code: status, title: 'Forbidden', message: `${error}` }];
  res.set('Cache-Control', 'private, no-cache');
  res.status(status).render('error', { message });
};

module.exports = {
  json,
  error500,
  error502,
  error403,
};
