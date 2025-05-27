import express from "express";
import { body, param } from "express-validator";
import {
  createOpportunity,
  getOpportunities,
  getOpportunity,
  updateOpportunity,
  deleteOpportunity,
} from "../../controllers/opportunity/opportunityController.js";
import { authMiddleware } from "../../middlewares/auth.js";

const router = express.Router();

router.post(
  "/",
  [
    body("name").isString().withMessage("name is required"),
    body("stage").isString().withMessage("stage is required"),
    body("amount").isFloat().withMessage("amount is required"),
    body("close_date").isISO8601().withMessage("close_date is required"),
    body("lead_id").isUUID().withMessage("lead_id is required"),
  ],
  authMiddleware,
  createOpportunity
);

router.get("/", authMiddleware, getOpportunities);

router.get(
  "/:id",
  [param("id").isUUID().withMessage("Invalid opportunity ID")],
  authMiddleware,
  getOpportunity
);

router.put("/:id", getOpportunity);

router.put(
  "/:id",
  [
    param("id").isUUID().withMessage("Invalid opportunity ID"),
    body("name").isString().withMessage("name is required"),
    body("stage").isString().withMessage("stage is required"),
    body("amount").isFloat().withMessage("amount is required"),
    body("close_date").isISO8601().withMessage("close_date is required"),
    body("lead_id").isUUID().withMessage("lead_id is required"),
  ],
  authMiddleware,
  updateOpportunity
);

router.delete(
  "/:id",
  [param("id").isUUID().withMessage("Invalid opportunity ID")],
  authMiddleware,
  deleteOpportunity
);

export default router;
