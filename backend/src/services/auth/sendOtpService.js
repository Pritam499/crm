// src/services/auth/sendOtpService.js
import { Users } from '../../models/users.js';
import sendEmail from '../../utils/sendEmail.js';

const sendOtpService = async (email) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  let user = await Users.findOne({ where: { email } });

  if (!user) {
    user = await Users.create({
      email,
      otp,
      otp_expires_at: new Date(Date.now() + 5 * 60 * 1000),
      isVerified: false,
      password_hash: '',
      name: ''
    });
  } else {
    user.otp = otp;
    user.otp_expires_at = new Date(Date.now() + 5 * 60 * 1000);
    await user.save();
  }

  await sendEmail(email, 'Your OTP Code', `Your OTP is: ${otp}`);
  return { email, message: 'OTP sent to email' };
};

export default sendOtpService;
