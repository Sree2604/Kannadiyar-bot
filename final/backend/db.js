const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: 5432,
    host: process.env.PGHOST,
    ssl: { rejectUnauthorized: false }, // Use SSL with a specific configuration if needed
    // connectionTimeoutMillis: 50000, // Optional: connection timeout
    // idleTimeoutMillis: 30000 // Optional: idle timeout
});

module.exports = pool;