import express from 'express';
import { body, param } from 'express-validator';
import {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
} from '../../controllers/task/taskController.js';
import { authMiddleware } from '../../middlewares/auth.js';

const router = express.Router();

router.post(
  '/',
  [
    body('title').isString().withMessage('title is required'),
    body('due_date').isISO8601().withMessage('due_date is required'),
    body('completed').isBoolean().withMessage('completed is required'),
    body('lead_id').isUUID().withMessage('lead_id is required'),
  ],
  authMiddleware,
  createTask
);

router.get('/', authMiddleware, getTasks);

router.get(
  '/:id',
  [param('id').isUUID().withMessage('Invalid task ID')],
  authMiddleware,
  getTask
);

router.put(
  '/:id',
  [
    param('id').isUUID().withMessage('Invalid task ID'),
    body('title').isString().withMessage('title is required'),
    body('due_date').isISO8601().withMessage('due_date is required'),
    body('completed').isBoolean().withMessage('completed is required'),
    body('lead_id').isUUID().withMessage('lead_id is required'),
  ],
  authMiddleware,
  updateTask
);

router.delete(
  '/:id',
  [param('id').isUUID().withMessage('Invalid task ID')],
  authMiddleware,
  deleteTask
);

export default router;
