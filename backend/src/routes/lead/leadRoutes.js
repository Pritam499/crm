// backend/src/routes/lead/leadRoutes.js
import express from 'express';
import { body, param } from 'express-validator';
import {
  createLead,
  getLeads,
  getLead,
  updateLead,
  deleteLead,
} from '../../controllers/lead/leadController.js';

import {authMiddleware} from '../../middlewares/authMiddleware.js'; // a small wrapper to handle express-validator results

const router = express.Router();

// Create
router.post(
  '/',
  [ body('source').optional().isString(), body('status').optional().isString(), body('value').optional().isFloat() ],
  authMiddleware,
  createLead
);

// Read all
router.get('/', authMiddleware, getLeads);

// Read one
router.get(
  '/:id',
  [ param('id').isUUID().withMessage('Invalid lead ID') ],
  authMiddleware,
  getLead
);

// Update
router.put(
  '/:id',
  [ param('id').isUUID(), body('status').optional(), body('value').optional() ],
  authMiddleware,
  updateLead
);

// Delete
router.delete(
  '/:id',
  [ param('id').isUUID() ],
  authMiddleware,
  deleteLead
);

export default router;
