const express = require('express');
const app = express.Router();

app.get('/', (req, res) => {
  res.json({ success: true, use: '/cdn?url=' });
  // log
  if (process.env.NODE_ENV !== 'production') {
    console.log(`REQUEST: berhasil on ~ /`);
  }
});

module.exports = app;
