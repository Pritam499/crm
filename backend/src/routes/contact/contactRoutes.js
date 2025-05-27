import express from "express";
import { body, param } from "express-validator";
import {
  createContact,
  getContacts,
  getContact,
  updateContact,
  deleteContact,
} from "../../controllers/contact/contactController.js";
import { authMiddleware } from "../../middlewares/auth.js";

const router = express.Router();

router.post(
  "/",
  [
    body('lead_id').isUUID().withMessage('lead_id is required'),
    body("first_name").isString().withMessage("first_name is required"),
    body("last_name").isString().withMessage("last_name is required"),
    body("email").isEmail().withMessage("valid email is required"),
    body("phone").isString().withMessage("phone is required"),
  ],
  authMiddleware,
  createContact
);

router.get("/", authMiddleware, getContacts);

router.get(
  "/:id",
  [param("id").isUUID().withMessage("Invalid contact ID")],
  authMiddleware,
  getContact
);

router.put(
  "/:id",
  [
    param("id").isUUID().withMessage("Invalid contact ID"),
    body("first_name").isString().withMessage("first_name is required"),
    body("last_name").isString().withMessage("last_name is required"),
    body("email").isEmail().withMessage("valid email is required"),
    body("phone").isString().withMessage("phone is required"),
    body("lead_id").isUUID().withMessage("lead_id is required"),
  ],
  authMiddleware,
  updateContact
);

router.delete(
  "/:id",
  [param("id").isUUID().withMessage("Invalid contact ID")],
  authMiddleware,
  deleteContact
);

export default router;
