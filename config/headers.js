module.exports = {
  // For Headers respone OK :v
  // Add headers
  add: {
    'Access-Control-Expose-Headers': '*',
    'X-Powered-By': 'nomcdn.com',
    'X-TimeStamp': Date.now(),
  },

  // Remove headers
  remove: ['Transfer-Encoding', 'Keep-Alive'],

  // Security headers
  security: {
    'Strict-Transport-Security': 'max-age=63072000',
    'X-Content-Type-Options': 'nosniff',
  },

  // disable robots
  noRobot: {
    'X-Robots-Tag': 'none',
  },
};
