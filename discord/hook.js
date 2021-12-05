'use strict';

require('dotenv').config();
const { Webhook } = require('discord-webhook-node');
const config = require('./config');
const color = require('../src/utils/color-log');

// Hook
let URL_DEV = process.env.DEV_DISCORD_WEBHOOK_URL;
let URL = process.env.DISCORD_WEBHOOK_URL;
if (!URL || !URL_DEV) {
  console.error(color.merah, 'ERROR :', 'REQUIRE DISCORD WEBHOOK URL!');
  process.exit();
}

if (process.env.NODE_ENV !== 'production') {
  // Discord Hook for Development
  const hook = new Webhook({ url: URL_DEV, throwErrors: false });
  hook.setUsername(config.USERNAME);
  hook.setAvatar(config.AVATAR);

  module.exports = { hook };
} else {
  // Discord Hook for Production
  const hook = new Webhook({ url: URL, throwErrors: false });
  hook.setUsername(config.USERNAME);
  hook.setAvatar(config.AVATAR);

  module.exports = { hook };
}
