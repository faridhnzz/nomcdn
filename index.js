const app = require('./src/app');
const color = require('./src/utils/color-log');
const webhook = require('./discord');

const PORT = process.env.PORT || 5400;
const localhost = '127.0.0.1';

app.listen(PORT, () => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(color.cyan, `Server listening on http://${localhost}:${PORT}`);
  } else {
    console.log(`Server listening on http://${localhost}:${PORT}`);
    webhook.info(`🚀 Server UP 🚀`);
  }
});
