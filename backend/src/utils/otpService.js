// import {Users} from '../models/users.js';

// class OTPService {
//   async generateOTP(email) {
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();

//     await Users.update(
//       {
//         otp,
//         otp_expires_at: new Date(Date.now() + 5 * 60 * 1000) // 5 minutes expiry
//       },
//       { where: { email } }
//     );

//     return otp;
//   }
// }

// export default new OTPService();

// src/utils/otpService.js
import { Users } from "../models/users.js";

class OTPService {
  async generateOTP(email) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes expiry

    const [user] = await Users.upsert(
      {
        email,
        otp,
        otp_expires_at: expiresAt,
        updatedAt: new Date(),
      },
      {
        where: { email },
        returning: true,
      }
    );

    return otp;
  }

  async verifyOTP(email, enteredOTP) {
    const user = await Users.findOne({ where: { email } });

    if (!user || !user.otp) {
      throw new Error("No OTP found for this user");
    }

    if (user.otp !== enteredOTP) {
      throw new Error("Invalid OTP");
    }

    if (new Date() > user.otp_expires_at) {
      throw new Error("OTP has expired");
    }

    // Clear OTP after successful verification
    await Users.update(
      { otp: null, otp_expires_at: null },
      { where: { email } }
    );

    return true;
  }
}

export default new OTPService();
