const cacheControl = (res, data, next) => {
  res.set('Cache-Control', `${data}`);
  next();
};

module.exports = {
  cacheControl,
};
