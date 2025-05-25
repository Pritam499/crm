// src/routes/index.js

import express from 'express';
const router = express.Router();

// Auth routes

import authRouter from '../routes/auth/index.js';
import leadRoutes from './lead/leadRoutes.js';


// ✅ Fix auth route priorities here
router.use('/auth', authRouter);
router.use('/leads', leadRoutes);

export default router;
