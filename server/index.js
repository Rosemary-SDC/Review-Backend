const express = require('express');
const db = require('../database/index');

const router = require('./routes');

const app = express();

app.use(express.json());
app.use(express.static('client/dist'));
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;

app.use('/', router);

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
