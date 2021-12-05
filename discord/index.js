const { hook } = require('./hook');

function info(message) {
  hook.info(message);
}

function warn(message) {
  hook.warning(message);
}

function error(message) {
  hook.error(message);
}

module.exports = { info, warn, error };
