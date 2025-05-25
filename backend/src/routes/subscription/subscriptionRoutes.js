// // src/routes/subscription/subscriptionRoutes.js
// import express from 'express';
// import {
//   createSubscription,
//   verifyPayment,
//   handleWebhook,
//   getSubscription,
//   cancelSubscription,
// } from '../../controllers/subscription/subscriptionController.js';
// import { authMiddleware as protect } from '../../middlewares/authMiddleware.js';

// const router = express.Router();

// // Razorpay webhook needs raw body
// router.post('/webhook', handleWebhook);

// // All below need JSON parser and auth
// router.use(protect);
// router.post('/checkout', createSubscription);
// router.post('/verify', verifyPayment);
// router.get('/', getSubscription);
// router.post('/cancel', cancelSubscription);

// export default router;

// src/routes/subscription/subscriptionRoutes.js

// import express from 'express';
// import {
//   createSubscription,
//   verifyPayment,
//   handleWebhook,
//   getSubscription,
//   cancelSubscription,
// } from '../../controllers/subscription/subscriptionController.js';
// import { authMiddleware as protect } from '../../middlewares/authMiddleware.js';

// const router = express.Router();

// // Razorpay webhook needs raw body (ensure raw parser is used in main server file)
// router.post('/razorpay/webhook', handleWebhook);

// // Use protect middleware for authenticated routes
// router.use(protect);

// // ✅ Fix endpoint names to match requirements
// router.post('/create-order', createSubscription);
// router.post('/verify-payment', verifyPayment);
// router.get('/', getSubscription);
// router.post('/cancel', cancelSubscription);

// export default router;

// src/routes/subscription/subscriptionRoutes.js
import express from 'express';
import {
  createSubscription,
  verifyPayment,
  handleWebhook,
  getSubscription,
  cancelSubscription,
} from '../../controllers/subscription/subscriptionController.js';
import { authMiddleware as protect } from '../../middlewares/authMiddleware.js';

const router = express.Router();

// Razorpay Webhook (no auth)
router.post('/razorpay/webhook', handleWebhook);

// All other routes require auth
router.use(protect);

router.post('/create-order', createSubscription);
router.post('/verify-payment', verifyPayment);
router.get('/', getSubscription);
router.post('/cancel', cancelSubscription);

export default router;
