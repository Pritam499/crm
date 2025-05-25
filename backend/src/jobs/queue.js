// src/jobs/queue.js

import { Queue } from 'bullmq';
import { REDIS_URL } from '../config/index.js';

/**
 * Initializes a BullMQ queue for handling jobs.
 *
 * This queue is connected to the Redis instance specified by the REDIS_URL
 * environment variable. The queue is used to manage and process background jobs
 * efficiently.
 */
const exampleQueue = new Queue('exampleQueue', {
  connection: REDIS_URL, // Redis connection URL
});

export { exampleQueue };

