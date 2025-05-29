// src/routes/index.js

import express from 'express';
const router = express.Router();

// Auth routes

import authRouter from '../routes/auth/index.js';
import leadRoutes from './lead/leadRoutes.js';
import contactRoutes from './contact/contactRoutes.js';
import opportunityRoutes from './opportunity/opportunityRoutes.js';
import taskRoutes from './task/taskRoutes.js';
import noteRoutes from './note/noteRoutes.js';
import activityRoutes from './activity/activityRoutes.js';
import reportRoutes from './report/reportRoutes.js';
import accountRoutes from './account/accountRoutes.js'


// ✅ Fix auth route priorities here
router.use('/auth', authRouter);
router.use('/leads', leadRoutes);
router.use('/contacts', contactRoutes);
router.use('/accounts', accountRoutes);
router.use('/opportunities', opportunityRoutes);
router.use('/tasks', taskRoutes);
router.use('/notes', noteRoutes);
router.use('/activities', activityRoutes);
router.use('/reports', reportRoutes);

export default router;
