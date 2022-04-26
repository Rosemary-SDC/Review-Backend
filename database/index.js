/* eslint-disable no-console */
const { Pool } = require('pg');
const DB_PW = require('../config');

const pool = new Pool({
  user: 'postgres',
  password: DB_PW,
  host: 'ec2-3-87-174-119.compute-1.amazonaws.com',
  database: 'SDC-Reviews',
  port: 5432,
});

pool.connect()
  .then(() => { console.log('db connected!'); })
  .catch((err) => { console.log('db connect error: ', err); });

module.exports = pool;
