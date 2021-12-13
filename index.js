const app = require('./src/app');
const color = require('./src/utils/color-log');
const webhook = require('./discord');

const PORT = process.env.PORT || 5400;
const IP = '127.0.0.1';

app.listen(PORT, (err) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(color.cyan, `Server listening on http://${IP}:${PORT}`);
    webhook.info(`🚀 Worker ${process.pid} started...`);
  } else {
    console.log(`Server listening on http://${IP}:${PORT}`);
    webhook.info(`🚀 Worker ${process.pid} started...`);
  }

  if (err) {
    webhook.error('🗿 The app could not start');
  }
});
