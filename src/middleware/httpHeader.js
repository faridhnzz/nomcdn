let addHeaders = {
  'access-control-allow-origin': '*',
  'access-control-expose-headers': '*',
  'x-powered-by': 'nomcdn',
};

let removeHeader = ('connection', 'x-vercel-id');

let xPowered = 'x-powered-by';

function header(req, res, next) {
  res.header(addHeaders);
  res.removeHeader(removeHeader);
  next();
}

module.exports = {
  xPowered,
  header,
};
