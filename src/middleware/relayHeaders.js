module.exports = {
  // Req from server
  relayRequestHeaders: ['If-Modified-Since', 'If-None-Match', 'User-Agent'],
  // Req from User
  relayResponseHeaders: ['Date', 'ETag', 'Location'],
};
