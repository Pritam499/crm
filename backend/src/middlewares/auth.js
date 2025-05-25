// src/middlewares/auth.js
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/index.js';

/**
 * Middleware to authenticate users using JWT.
 *
 * Looks for the `Authorization` header and verifies the token using the secret
 * from the environment variables. If the token is valid, it adds the `user` property
 * to the request object and calls the next middleware function. If the token is
 * invalid or missing, it returns a 401 Unauthorized response.
 *
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The next middleware function in the stack.
 */
export default (req, res, next) => {
  const authHeader = req.header('Authorization'); // Get the Authorization header

    // console.log("inside middleare")
  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized. Missing token' });
  }
  const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;
  // console.log("My Token ",token)

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    // console.log("This is my decodecd token how i am getting",req.user)
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token. Please try again' });
  }
};