// src/routes/auth/me.js
import express from "express";
import { authMiddleware } from "../../middlewares/auth.js";
const router = express.Router();

// GET /api/auth/me
router.get("/", authMiddleware, (req, res) =>
  res.json({ success: true, data: { email: req.user.email } })
);

export default router;
