// src/routes/auth/index.js

import express from 'express';


import sendOtp from './sendOtp.js';
import verifyOtpRouter from './verifyOtp.js';
import resendOtpRouter from './resendOtp.js';
import logout from './logout.js';
import meRouter from "./me.js";


const router = express.Router();

router.use('/send-otp', sendOtp);
router.use('/resend-otp', resendOtpRouter);
router.use('/verify-otp', verifyOtpRouter);
router.use('/logout', logout);
router.use("/me", meRouter);

export default router;