import express from 'express';
import { body, param } from 'express-validator';
import {
  createNote,
  getNotes,
  getNote,
  updateNote,
  deleteNote,
} from '../../controllers/note/noteController.js';
import { authMiddleware } from '../../middlewares/auth.js';

const router = express.Router();

router.post(
  '/',
  [
    body('content').isString().withMessage('content is required'),
    body('lead_id').isUUID().withMessage('lead_id is required'),
  ],
  authMiddleware,
  createNote
);

router.get('/', authMiddleware, getNotes);

router.get(
  '/:id',
  [param('id').isUUID().withMessage('Invalid note ID')],
  authMiddleware,
  getNote
);

router.put(
  '/:id',
  [
    param('id').isUUID().withMessage('Invalid note ID'),
    body('content').isString().withMessage('content is required'),
    body('lead_id').isUUID().withMessage('lead_id is required'),
  ],
  authMiddleware,
  updateNote
);

router.delete(
  '/:id',
  [param('id').isUUID().withMessage('Invalid note ID')],
  authMiddleware,
  deleteNote
);

export default router;