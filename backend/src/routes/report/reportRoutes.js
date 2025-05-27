import express from 'express';
import { body, param } from 'express-validator';
import {
  createReport,
  getReports,
  getReport,
  updateReport,
  deleteReport,
  getReportByType,
} from '../../controllers/report/reportController.js';
import { authMiddleware } from '../../middlewares/auth.js';

const router = express.Router();

router.post(
  '/',
  [
    body('name').isString().withMessage('name is required'),
    body('type').isString().withMessage('type is required'),
    body('params').isObject().withMessage('params is required'),
    body('result').isObject().withMessage('result is required'),
  ],
  authMiddleware,
  createReport
);

router.get('/', authMiddleware, getReports);

router.get(
  '/type/:type',
  [param('type').isString().withMessage('type is required')],
  authMiddleware,
  getReportByType
);

router.get(
  '/:id',
  [param('id').isUUID().withMessage('Invalid report ID')],
  authMiddleware,
  getReport
);

router.put(
  '/:id',
  [
    param('id').isUUID().withMessage('Invalid report ID'),
    body('result').isObject().withMessage('result is required'),
  ],
  authMiddleware,
  updateReport
);

router.delete(
  '/:id',
  [param('id').isUUID().withMessage('Invalid report ID')],
  authMiddleware,
  deleteReport
);

export default router;
