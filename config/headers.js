module.exports = {
  // For Headers respone OK :v
  // Add headers
  add: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Expose-Headers': '*',
    'X-Powered-By': 'NomCDN',
    'X-TimeStamp': Date.now(),
  },

  // Remove headers
  remove: ['Transfer-Encoding', 'Keep-Alive'],

  // Security headers
  security: {
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains',
    'X-Content-Type-Options': 'nosniff',
  },

  // disable robots
  noRobot: {
    'X-Robots-Tag': 'none',
  },

  // disable x-powered-by: express
  disablePowered: 'x-powered-by',
};
