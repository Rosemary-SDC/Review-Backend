const express = require('express');
const db = require('../database/index');

const router = require('./routes');

const app = express();

app.use(express.json());
app.use(express.static('client/dist'));
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;

app.use('/', router);

app.get('/loaderio-767f20fda1a94d0c851c014ba983ceee', (req, res) => {
  res.sendFile('/home/ubuntu/Review-Backend/loaderio-767f20fda1a94d0c851c014ba983ceee.txt');
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
