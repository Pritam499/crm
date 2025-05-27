// backend/src/app.js
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import path from 'path';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import { connectDB } from './config/db.js';
import errorHandler from './middlewares/errorHandler.js';
import authRoutes from './routes/auth/index.js';        // public auth
import subscriptionRoutes from './routes/subscription/subscriptionRoutes.js';
import protectedRoutes from './routes/index.js';        // all other /api

import {authMiddleware} from './middlewares/auth.js';     // your JWT guard

dotenv.config();
const app = express();

// Security & Parsing middleware
app.use(helmet({ crossOriginOpenerPolicy: false }));
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use('/razorpay/webhook', express.raw({ type: 'application/json' }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());
app.use('/public', express.static(path.join('public'), { dotfiles: 'deny' }));

// Connect to DB
connectDB();

// Public routes (no auth)
app.use('/api/auth', authRoutes);
app.use('/', subscriptionRoutes);

// JWT middleware for everything below
app.use(authMiddleware);

// Protected API routes
app.use('/api', protectedRoutes);

// Global error handler
app.use(errorHandler);

export default app;
