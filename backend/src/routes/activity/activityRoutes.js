import express from 'express';
import { body, param } from 'express-validator';
import {
  createActivity,
  getActivities,
  getActivity,
  updateActivity,
  deleteActivity,
} from '../../controllers/activity/activityController.js';
import { authMiddleware } from '../../middlewares/auth.js';

const router = express.Router();

router.post(
  '/',
  [
    body('type').isString().withMessage('type is required'),
    body('details').isObject().withMessage('details is required'),
    body('lead_id').isUUID().withMessage('lead_id is required'),
  ],
  authMiddleware,
  createActivity
);

router.get('/', authMiddleware, getActivities);

router.get(
  '/:id',
  [param('id').isUUID().withMessage('Invalid activity ID')],
  authMiddleware,
  getActivity
);

router.put(
  '/:id',
  [
    param('id').isUUID().withMessage('Invalid activity ID'),
    body('type').isString().withMessage('type is required'),
    body('details').isObject().withMessage('details is required'),
    body('lead_id').isUUID().withMessage('lead_id is required'),
  ],
  authMiddleware,
  updateActivity
);

router.delete(
  '/:id',
  [param('id').isUUID().withMessage('Invalid activity ID')],
  authMiddleware,
  deleteActivity
);

export default router;
