const app = require('./src/app');
const color = require('./src/utils/color-log');

const PORT = process.env.PORT || 5400;
const localhost = '127.0.0.1';

app.listen(PORT, () => {
  console.log(color.cyan, `Server listening on http://${localhost}:${PORT}`);
});
