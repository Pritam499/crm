// src/middlewares/cache.js

import redis from 'ioredis';

// Create a Redis client using the connection URL from environment variables
const client = new redis(process.env.REDIS_URL);

/**
 * Cache middleware to cache responses in Redis.
 *
 * This middleware checks if there is cached data for the current request URL.
 * If cached data exists, it returns the cached response. Otherwise, it caches
 * the response for future requests.
 *
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The next middleware function in the stack.
 *
 * @returns {undefined} Returns nothing.
 */
const cache = async (req, res, next) => {
  // Use the request URL as the cache key
  const key = req.originalUrl;
  // Retrieve cached data from Redis
  const cachedData = await client.get(key);

  // If there is cached data, parse and return it
  if (cachedData) {
    return res.json(JSON.parse(cachedData));
  }

  // Overwrite the original res.json function to cache the response
  res.sendResponse = res.json;
  res.json = async (body) => {
    // Cache the response in Redis for 1 hour
    await client.setex(key, 3600, JSON.stringify(body));
    // Call the original res.json function with the cached data
    res.sendResponse(body);
  };

  // Call the next middleware function in the stack
  next();
};

