const { Webhook } = require('discord-webhook-node');
const hook = new Webhook('https://discord.com/api/webhooks/915892506510643210/BFVuZrQoEWgVdFAsM9dk8IAWz6LIQO81_Ze9_mMuQcsEEpwsXj7KRGgNf_dqSkBg_utf');

// hook info
function info(message) {
  hook.info(message);
}

module.exports = { info };
