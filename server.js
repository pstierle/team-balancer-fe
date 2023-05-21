const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'dist', 'team-balancer-fe')))

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'team-balancer-fe', 'index.html'));
});

app.listen(port, '0.0.0.0');
