// src/config/sequelizecli.js

import dotenv from 'dotenv';

dotenv.config();

export default {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    timezone: 'UTC', // Ensures timestamps are stored in UTC
    dialectOptions: {
      useUTC: true,
    },
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    timezone: 'UTC',
    dialectOptions: {
      useUTC: true,
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
