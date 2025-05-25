// src/config/index.js

import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;
const DB_URI = process.env.DB_URI;
const JWT_SECRET = process.env.JWT_SECRET;
const REDIS_URL = process.env.REDIS_URL;
const DB_NAME=process.env.DB_NAME;
const DB_USER=process.env.DB_USER;
const DB_PASS=process.env.DB_PASS;
const DB_HOST=process.env.DB_HOST;
const DB_PORT=process.env.DB_PORT;
export { PORT, DB_URI, JWT_SECRET, REDIS_URL ,DB_USER,DB_PASS,DB_HOST,DB_PORT,DB_NAME};