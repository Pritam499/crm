import { OAuth2Client } from "google-auth-library";
import { Users } from "../../models/users.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleAuthService = async (token) => {
  const ticket = await client.verifyIdToken({
  idToken: token,
  audience: process.env.GOOGLE_CLIENT_ID,
});

console.log("Incoming token:", token);
console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);

const payload = ticket.getPayload();
console.log("Google payload:", payload);
  const { email, name } = payload;

  let user = await Users.findOne({ where: { email } });

  if (!user) {
    // Create new user if doesn't exist
    user = await Users.create({
      email,
      name,
      isVerified: true, // Google verified users are automatically verified
      password_hash: "", // No password for Google auth users
    });
  }

  const authToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return {
    token: authToken,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      isVerified: user.isVerified,
    },
  };
};

export default googleAuthService;
