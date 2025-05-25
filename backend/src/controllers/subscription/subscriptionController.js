// // src/controllers/subscriptionController.js
// import razorpay from '../../config/razorpay.js';
// import crypto from 'crypto';
// import Users from '../../models/users.js';

// export const createSubscription = async (req, res) => {
//   try {
//     const { planId } = req.body; // Razorpay plan_id from dashboard
//     const subscription = await razorpay.subscriptions.create({
//       plan_id: planId,
//       customer_notify: 1,
//       total_count: 12, // Monthly billing for 12 months
//     });

//     res.status(200).json({ subscriptionId: subscription.id });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// export const verifyPayment = async (req, res) => {
//   try {
//     const { razorpay_signature, razorpay_payment_id, razorpay_subscription_id } = req.body;

//     const generatedSignature = crypto
//       .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
//       .update(razorpay_payment_id + '|' + razorpay_subscription_id)
//       .digest('hex');

//     if (generatedSignature !== razorpay_signature) {
//       return res.status(400).json({ error: 'Payment verification failed' });
//     }

//     // Update user as Pro
//     await Users.update({ isPro: true }, { where: { id: req.user.id } });

//     res.status(200).json({ message: 'Subscription successful' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// src/controllers/subscription/subscriptionController.js

import * as subscriptionService from '../../services/subscription/subscriptionService.js';
import generateResponse from '../../utils/generateResponse.js';

export const createSubscription = async (req, res) => {
  try {
    const { amount, currency } = req.body;
    console.log("CREATE ORDER BODY:", req.body); // add this temporarily

if (!amount || !currency) {
  return res.status(400).json({ error: "Missing amount or currency" });
}
    const result = await subscriptionService.createOrder(req.user.userId, amount, currency);
    res.status(201).json(generateResponse(true, result, 'Subscription order created'));

  } catch (err) {
    res.status(400).json(generateResponse(false, {}, 'Order creation failed', err.message));
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    await subscriptionService.verifySignature(razorpay_order_id, razorpay_payment_id, razorpay_signature);
    res.json(generateResponse(true, {}, 'Payment verified'));
  } catch (err) {
    res.status(400).json(generateResponse(false, {}, 'Verification failed', err.message));
  }
};

export const handleWebhook = async (req, res) => {
  try {
    await subscriptionService.processWebhook(req);
    res.status(200).send('OK');
  } catch (err) {
    res.status(400).send('Invalid signature');
  }
};

export const getSubscription = async (req, res) => {
  try {
    const sub = await subscriptionService.getActive(req.user.userId);
    res.json(generateResponse(true, sub, 'Fetched subscription'));
  } catch (err) {
    res.status(400).json(generateResponse(false, {}, 'Fetch failed', err.message));
  }
};

export const cancelSubscription = async (req, res) => {
  try {
    await subscriptionService.cancel(req.user.userId);
    res.json(generateResponse(true, {}, 'Subscription canceled'));
  } catch (err) {
    res.status(400).json(generateResponse(false, {}, 'Cancel failed', err.message));
  }
};
