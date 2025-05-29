import express from "express";
import { body, param } from "express-validator";
import {
  createAccount,
  getAccounts,
  getAccount,
  updateAccount,
  deleteAccount,
} from "../../controllers/account/accountController.js";
import { authMiddleware } from "../../middlewares/auth.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  [
    body("name").isString().notEmpty().withMessage("Name is required"),
    body("industry").optional().isString(),
    body("website").optional().isURL().withMessage("Website must be a valid URL"),
  ],
  createAccount
);

router.get("/", authMiddleware, getAccounts);

router.get(
  "/:id",
  authMiddleware,
  [param("id").isUUID().withMessage("Invalid account ID")],
  getAccount
);

router.put(
  "/:id",
  authMiddleware,
  [
    param("id").isUUID().withMessage("Invalid account ID"),
    body("name").isString().notEmpty().withMessage("Name is required"),
    body("industry").optional().isString(),
    body("website").optional().isURL().withMessage("Website must be a valid URL"),
  ],
  updateAccount
);

router.delete(
  "/:id",
  authMiddleware,
  [param("id").isUUID().withMessage("Invalid account ID")],
  deleteAccount
);

export default router;
