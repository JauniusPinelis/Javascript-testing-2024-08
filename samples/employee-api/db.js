// db.js
const { Pool } = require('pg');

// Create a new pool of clients for connecting to the database
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'employee-db',
  password: 'postgres',
  port: 5432, // Default port for PostgreSQL
});

module.exports = pool;
