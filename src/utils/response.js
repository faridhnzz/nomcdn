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
  res.status(status).json({
    status: false,
    code: `-${status}`,
    error: `Bad Gateway`,
    message: `${error}`,
  });
};

const error403 = (res, error, status = 403) => {
  res.status(status).json({
    status: false,
    code: `-${status}`,
    error: `Forbidden`,
    message: `Stop that.`,
  });
};

module.exports = {
  json,
  error500,
  error502,
  error403,
};
