// config/redis.js

const redis = require("redis");
require("dotenv").config();

const redisUrl = process.env.REDIS_URL || "redis://127.0.0.1:6379";

// Create Redis client using URL
const client = redis.createClient({
    url: redisUrl,
});

client.connect()
    .then(() => console.log("Connected to Redis ✅"))
    .catch((err) => console.error("Redis Connection Error ❌", err));

module.exports = client;
