require('dotenv').config();
const { Webhook } = require('discord-webhook-node');
const hook = new Webhook(process.env.DISCORD_WEBHOOK);

// hook info
function info(message) {
  hook.info(message);
}

module.exports = { info };
