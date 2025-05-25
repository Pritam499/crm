// src/config/db.js
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// PostgreSQL connection URI
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  port:process.env.DB_PORT,
  dialect: 'postgres',
  dialectOptions: {
    useUTC: true, // Ensure all timestamps are stored in UTC
  },
  define: {
    timestamps: true, // Enable createdAt & updatedAt
    underscored: true, // Use snake_case column names
  },
  logging: false, // Disable logging for cleaner output
});

// Function to connect to the database
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL Connected');
  } catch (err) {
    console.error('PostgreSQL Connection Error:', err);
    process.exit(1);
  }
};

export { sequelize, connectDB };

