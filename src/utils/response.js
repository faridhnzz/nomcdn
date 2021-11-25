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
    code: `NOT FOUND`,
    error: `Something went wrong: ${error}`,
  });
};

const error403 = (res, error, status = 403) => {
  res.status(status).json({
    status: false,
    code: status,
    message: `${error}`,
  });
};

module.exports = {
  json,
  error500,
  error403,
};
