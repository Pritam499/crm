// import express from 'express';
// import { body, validationResult } from 'express-validator';
// import { registerUser } from '../controllers/user.js';
// import generateResponse from '../utils/generateResponse.js';

// const router = express.Router();

// router.post(
//   '/register',
//   [
//     body('email').isEmail(),
//     body('password').isLength({ min: 6 }),
//   ],
//   (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json(generateResponse(false, null, 'Bad Request', null, { errors: errors.array() }));
//     }
//     next();
//   },
//   // registerUser
// );

// export default router;

