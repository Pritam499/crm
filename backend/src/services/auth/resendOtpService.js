// src/services/auth/resendOtpService.js

// import { Users } from "../../models/users.js";
// import sendEmail from "../../utils/sendEmail.js";

// const resendOtpService = async ({ email }) => {
//   const user = await Users.findOne({ where: { email } });

//   if (!user) {
//     throw new Error("User not found");
//   }

//   const otp = Math.floor(100000 + Math.random() * 900000).toString();

//   user.otp = otp;
//   user.otp_expires_at = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes expiry
//   await user.save();

//   // Send OTP via email
//   await sendEmail(email, "Your New OTP Code", `Your new OTP code is: ${otp}`);

//   return { email, message: "OTP resent successfully" };
// };

// export default resendOtpService;

import { Users } from '../../models/users.js';
import sendEmail from '../../utils/sendEmail.js';

const resendOtpService = async (email) => {
  const user = await Users.findOne({ where: { email } });

  if (!user) {
    throw new Error('User not found');
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  user.otp = otp;
  user.otp_expires_at = new Date(Date.now() + 5 * 60 * 1000);
  await user.save();

  await sendEmail(email, 'Your OTP Code', `Your OTP is: ${otp}`);
  return { email, message: 'New OTP sent' };
};

export default resendOtpService;
