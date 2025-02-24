// config/db.js

const { Pool } = require("pg");
require("dotenv").config();

// PostgreSQL connection using DATABASE_URL
const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // Uses DATABASE_URL from .env
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false, // SSL for production
});

pool.connect()
    .then(() => console.log("Connected to PostgreSQL ✅"))
    .catch((err) => console.error("PostgreSQL Connection Error ❌", err));

module.exports = pool;
