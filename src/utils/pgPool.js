const pgConfig = require('../config/pg.config');
const { Pool } = require('pg');

const pgPool = new Pool(pgConfig);

module.exports = pgPool;
