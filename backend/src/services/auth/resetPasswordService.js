// src/services/auth/resetPasswordService.js

import {Users} from '../../models/users.js';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import sendEmail from '../../utils/sendEmail.js'; // you can mock or build this
import dotenv from 'dotenv';
dotenv.config();

const TOKEN_EXPIRY = 15 * 60 * 1000; // 15 minutes

export const handleForgotPassword = async (email) => {
  const user = await Users.findOne({ where: { email } });
  if (!user) return;

  const resetToken = crypto.randomBytes(32).toString('hex');
  const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  const tokenExpiry = new Date(Date.now() + TOKEN_EXPIRY);

  // Save token in DB (add columns to Users model: reset_token, reset_token_expiry)
  user.reset_token = hashedToken;
  user.reset_token_expiry = tokenExpiry;
  await user.save();

  const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

  await sendEmail({
    to: email,
    subject: 'Password Reset Request',
    html: `<p>Click the link to reset your password: <a href="${resetLink}">${resetLink}</a></p>`,
  });
};

export const handleResetPassword = async (token, newPassword) => {
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
  const user = await Users.findOne({
    where: {
      reset_token: hashedToken,
      reset_token_expiry: { [Op.gt]: new Date() },
    },
  });

  if (!user) throw new Error('Invalid or expired token');

  user.password_hash = await bcrypt.hash(newPassword, 10);
  user.reset_token = null;
  user.reset_token_expiry = null;
  await user.save();
};
